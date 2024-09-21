export default interface IPaymentService {
    createPaymentIntent(amount: number, currency: string): Promise<{ id: string, clientSecret: string }>
    retrievePaymentIntent(paymentIntentId: string): Promise<any>
    handleWebhookEvent(body: Buffer, signature: string): Promise<any>
}
