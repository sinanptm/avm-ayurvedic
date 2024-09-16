import { model, Schema } from 'mongoose';
import IPayment, { PaymentStatus } from '../../domain/entities/IPayment';

const paymentSchema = new Schema<IPayment>(
  {
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      default: null,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
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
    razorpaySignature: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false, 
    minimize: false, 
  }
);
const PaymentModel = model<IPayment>('Payment', paymentSchema);

export default PaymentModel;
