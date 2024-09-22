export enum PaymentStatus {
   PENDING = "PENDING",
   COMPLETED = "COMPLETED",
   FAILED = "FAILED",
}

export default interface IPayment {
   _id?: string;
   orderId?: string;
   paymentId?: string;
   appointmentId?: string;
   amount?: number;
   currency?: string;
   status?: PaymentStatus;
   createdAt?: Date;
   updatedAt?: Date;
}
