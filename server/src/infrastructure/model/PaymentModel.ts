import { model, Schema } from "mongoose";
import IPayment, { PaymentStatus } from "@/domain/entities/IPayment";

const paymentSchema = new Schema<IPayment>(
   {
      orderId: {
         type: String,
      },
      paymentId: {
         type: String,
         default: null,
      },
      appointmentId: {
         type: Schema.Types.ObjectId,
         ref: "Appointment",
         index: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      currency: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         enum: Object.values(PaymentStatus),
         default: PaymentStatus.PENDING,
         required: true,
      },
   },
   {
      timestamps: true,
      versionKey: false,
      minimize: false,
   }
);
const PaymentModel = model<IPayment>("Payment", paymentSchema);

export default PaymentModel;
