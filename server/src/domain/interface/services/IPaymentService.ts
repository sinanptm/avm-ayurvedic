export default interface IPaymentService {
    createOrder(amount: number, currency: string, receipt: string): Promise<RazorpayOrder>;
    verifyPaymentSignature(signature: string, orderId: string, paymentId: string): Promise<void>;
}

export interface RazorpayOrder {
    id: string;
    amount: string | number;
    currency: string;
    receipt?: string;
    status: string;
}
