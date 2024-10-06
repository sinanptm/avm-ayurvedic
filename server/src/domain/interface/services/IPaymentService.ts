export default interface IPaymentService {
   createCheckoutSession(
      amount: number,
      currency: string,
      successUrl: string,
      cancelUrl: string,
      metadata?: Record<string, any>
   ): Promise<{ id: string; url: string }>;
   retrievePaymentIntent(paymentIntentId: string): Promise<any>;
   handleWebhookEvent(body: Buffer, signature: string): Promise<{ event: any; transactionId: string }>;
   refundPayment(paymentIntentId: string, amount?: number, reason?: string): Promise<any>
}
