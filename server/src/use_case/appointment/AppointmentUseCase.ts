import IAppointment, { AppointmentStatus, AppointmentType } from "../../domain/entities/IAppointment";
import CustomError from "../../domain/entities/CustomError";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { StatusCode } from "../../types";
import IPaymentService from "../../domain/interface/services/IPaymentService";
import IPaymentRepository from "../../domain/interface/repositories/IPaymentRepository";
import { PaymentStatus } from "../../domain/entities/IPayment";

export default class AppointmentUseCase {
    bookingAmount: number;

    constructor(
        private appointmentRepository: IAppointmentRepository,
        private slotRepository: ISlotRepository,
        private validatorService: IValidatorService,
        private paymentService: IPaymentService,
        private paymentRepository: IPaymentRepository
    ) {
        this.bookingAmount = 300;
    }

    async createAppointment(
        appointmentData: IAppointment,
        patientId: string
    ): Promise<{ appointmentId: string, orderId: string }> {
        this.validateAppointmentData(appointmentData, patientId);

        const slot = await this.slotRepository.findById(appointmentData.slotId!);
        if (!slot) throw new CustomError("Slot Not Found", StatusCode.NotFound);

        if (slot.status === 'booked') {
            const bookedAppointment = await this.appointmentRepository.findByDateAndSlot(appointmentData.appointmentDate!, appointmentData.slotId!);
            if (bookedAppointment) throw new CustomError("Slot already booked", StatusCode.Conflict);
        } else {
            slot.status = 'booked';
            await this.slotRepository.update(slot);
        }

        const payment = await this.paymentRepository.create({
            orderId: '',
            appointmentId: appointmentData._id!,
            amount: this.bookingAmount,
            currency: 'INR',
            status: PaymentStatus.PENDING,
        });

        const razorpayOrder = await this.paymentService.createOrder(this.bookingAmount, 'INR', `receipt_${payment._id}`);

        await this.paymentRepository.update({
            _id: payment._id,
            orderId: razorpayOrder.id!,
        });

        const appointmentId = await this.appointmentRepository.create({
            ...appointmentData,
            patientId,
            status: AppointmentStatus.PAYMENT_PENDING,
            paymentId: razorpayOrder.id!,
        });

        return { orderId: razorpayOrder.id, appointmentId };
    }

    async verifyPayment(paymentData: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }, appointmentId: string): Promise<void> {
        this.validatorService.validateRequiredFields({
            razorpay_order_id: paymentData.razorpay_order_id,
            razorpay_payment_id: paymentData.razorpay_payment_id,
            razorpay_signature: paymentData.razorpay_signature,
            appointmentId,

        });
        await this.paymentService.verifyPaymentSignature(
            paymentData.razorpay_signature,
            paymentData.razorpay_order_id,
            paymentData.razorpay_payment_id
        );
        const payment = await this.paymentRepository.findByOrderId(paymentData.razorpay_order_id);
        if (!payment) throw new CustomError("Payment not found", StatusCode.NotFound);

        await this.paymentRepository.update({
            _id: payment._id,
            orderId: payment.orderId,
            paymentId: paymentData.razorpay_payment_id,
            appointmentId: payment.appointmentId,
            amount: payment.amount,
            currency: payment.currency,
            status: PaymentStatus.COMPLETED,
            razorpaySignature: paymentData.razorpay_signature,
        });

        await this.appointmentRepository.updateAppointmentStatusToConfirmed(appointmentId);
    }

    private validateAppointmentData({ appointmentDate, appointmentType, doctorId, notes, reason, slotId, }: IAppointment, patientId: string): void {
        this.validatorService.validateRequiredFields({ slotId, appointmentType, doctorId, reason, appointmentDate })!
        this.validatorService.validateIdFormat(doctorId!);
        this.validatorService.validateIdFormat(slotId!);
        this.validatorService.validateIdFormat(patientId!);
        this.validatorService.validateEnum(appointmentType!, Object.values(AppointmentType));
        this.validatorService.validateDateFormat(appointmentDate!);
        this.validatorService.validateLength(reason!, 1, 255);

        if (notes) this.validatorService.validateLength(notes, 0, 255);
    }
}
