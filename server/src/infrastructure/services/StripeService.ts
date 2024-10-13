import Stripe from "stripe";
import IPaymentService from "../../domain/interface/services/IPaymentService";
import CustomError from "../../domain/entities/CustomError";
import { StatusCode } from "../../types";
import logger from "../../utils/logger";
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "../../config/env";

const stripe = new Stripe(STRIPE_SECRET_KEY as string, {
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

   async handleWebhookEvent(
      body: Buffer,
      signature: string
   ): Promise<{ event: any; transactionId: string; type: "charge" | "paymentSuccess" | "" }> {
      try {
         const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET!);
         let res: { event: any; transactionId: string; type: "charge" | "paymentSuccess" | "" } = {
            event: null,
            transactionId: "",
            type: "",
         };
         switch (event.type) {
            case "payment_intent.succeeded":
               const paymentIntent = event.data.object as Stripe.PaymentIntent;
               res = { event, transactionId: paymentIntent.id, type: "paymentSuccess" };
               break;

            case "payment_intent.payment_failed":
               throw new CustomError("Payment failed", StatusCode.PaymentError);

            case "charge.succeeded":
               const charge = event.data.object as Stripe.Charge;
               res = { event, transactionId: charge.id, type: "charge" };

            default:
               break;
         }
         return res;
      } catch (error) {
         logger.error(error);
         throw new CustomError("Error processing webhook event", StatusCode.PaymentError);
      }
   }

   async refundPayment(paymentId: string, amount?: number): Promise<any> {
      try {
         await stripe.refunds.create({
            charge: paymentId,
            amount: amount ? amount * 100 : undefined,
            reason: "requested_by_customer",
         });
      } catch (error: any) {
         if (error.raw.code === "charge_already_refunded") {
            return null;
         }
         logger.error(error);
         return null;
      }
   }
}

export default StripePaymentService;
