import IPayment from "../../entities/IPayment";

export default interface IPaymentRepository {
   create(payment: IPayment): Promise<IPayment>;
   findById(id: string): Promise<IPayment | null>;
   findByOrderId(orderId: string): Promise<IPayment | null>;
   update(payment: IPayment): Promise<void>;
}
