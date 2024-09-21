import Stripe from 'stripe';
import IPaymentService from '../../domain/interface/services/IPaymentService';
import CustomError from '../../domain/entities/CustomError';
import { StatusCode } from '../../types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
});

class StripePaymentService implements IPaymentService {
    async createPaymentIntent(amount: number, currency: string): Promise<{ id: string, clientSecret: string }> {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
            });
            return {
                id: paymentIntent.id,
                clientSecret: paymentIntent.client_secret!, // Use this to complete the payment on the frontend
            };
        } catch (error) {
            throw new CustomError('Error creating payment intent', StatusCode.PaymentError);
        }
    }

    async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
        try {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            return paymentIntent;
        } catch (error) {
            throw new CustomError('Error retrieving payment intent', StatusCode.PaymentError);
        }
    }

    async handleWebhookEvent(body: Buffer, signature: string): Promise<Stripe.Event> {
        try {
            const event = stripe.webhooks.constructEvent(
                body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET!
            );

            switch (event.type) {
                case 'payment_intent.succeeded': {
                    return event;
                }
                case 'payment_intent.payment_failed': {
                    throw new CustomError('Payment failed', StatusCode.PaymentError);
                }
                default:
                    throw new CustomError(`Unhandled event type ${event.type}`, StatusCode.BadRequest);
            }
        } catch (error) {
            throw new CustomError('Error processing webhook event', StatusCode.InternalServerError);
        }
    }
}

export default StripePaymentService;
