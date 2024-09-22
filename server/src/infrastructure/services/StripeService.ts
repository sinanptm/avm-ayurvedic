import Stripe from "stripe";
import IPaymentService from "../../domain/interface/services/IPaymentService";
import CustomError from "../../domain/entities/CustomError";
import { StatusCode } from "../../types";
import logger from "../../utils/logger";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
   apiVersion: "2024-06-20",
});

class StripePaymentService implements IPaymentService {
   async createCheckoutSession(
      amount: number,
      currency: string,
      successUrl: string,
      cancelUrl: string,
      metadata?: Record<string, any>
   ): Promise<{ id: string; url: string }> {
      try {
         const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
               {
                  price_data: {
                     currency,
                     product_data: {
                        name: "Appointment Fee",
                     },
                     unit_amount: amount * 100,
                  },
                  quantity: 1,
               },
            ],
            mode: "payment",
            metadata,
            success_url: successUrl,
            cancel_url: cancelUrl,
            payment_intent_data: {
               metadata: { paymentId: metadata?.paymentId! },
            },
         });

         return {
            id: session.id,
            url: session.url!,
         };
      } catch (error) {
         logger.error(error);
         throw new CustomError("Error creating checkout session", StatusCode.PaymentError);
      }
   }
   async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
      try {
         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
         return paymentIntent;
      } catch (error) {
         logger.error(error);
         throw new CustomError("Error retrieving payment intent", StatusCode.PaymentError, undefined, error);
      }
   }

   async handleWebhookEvent(body: Buffer, signature: string): Promise<Stripe.Event | any> {
      try {
         const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

         switch (event.type) {
            case "payment_intent.succeeded":
               return event;
            case "payment_intent.payment_failed":
               throw new CustomError("Payment failed", StatusCode.PaymentError);
            case "payment_intent.created":
               break;
            case "charge.succeeded":
               break;
            case "checkout.session.completed":
               break;
            default:
               return null;
         }
      } catch (error) {
         logger.error(error);
         throw new CustomError("Error processing webhook event", StatusCode.PaymentError);
      }
   }
}

export default StripePaymentService;
