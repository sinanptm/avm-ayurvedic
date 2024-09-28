export enum PaymentStatus {
   PENDING = "PENDING",
   COMPLETED = "COMPLETED",
   FAILED = "FAILED",
}

export default interface IPayment {
   readonly _id?: string;
   readonly orderId?: string;
   readonly paymentId?: string;
   readonly appointmentId?: string;
   readonly amount?: number;
   readonly currency?: string;
   readonly status?: PaymentStatus;
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
}
