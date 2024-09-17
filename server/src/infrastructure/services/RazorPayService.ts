import Razorpay from 'razorpay';
import IPaymentService, { RazorpayOrder } from '../../domain/interface/services/IPaymentService';
import { StatusCode } from '../../types';
import CustomError from '../../domain/entities/CustomError'
import * as crypto from 'crypto';


export default class RazorPayService implements IPaymentService {
    private razorpay: any;

    constructor() {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KET_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });
    }

    async createOrder(amount: number, currency: string, receipt: string): Promise<RazorpayOrder> {
        const options = {
            amount: amount * 100, 
            currency,
            receipt,
            payment_capture: 1,
        };

        try {
            const order = await this.razorpay.orders.create(options);
            return {
                ...order,
                amount: typeof order.amount === 'string' ? parseInt(order.amount, 10) : order.amount,
            };
        } catch (error) {
            throw new CustomError('Error creating Razorpay order', StatusCode.PaymentError);
        }
    }

    async verifyPaymentSignature(signature: string, orderId: string, paymentId: string): Promise<void> {
        try {
            const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
                .update(orderId + '|' + paymentId)
                .digest('hex');

            if (generatedSignature !== signature) {
                throw new CustomError('Invalid payment signature', StatusCode.PaymentError);
            }
        } catch (error) {
            throw new CustomError('Error verifying payment signature', StatusCode.PaymentError);
        }
    }
}
