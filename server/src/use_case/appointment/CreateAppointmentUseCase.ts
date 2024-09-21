import IAppointment, { AppointmentStatus, AppointmentType } from "../../domain/entities/IAppointment";
import CustomError from "../../domain/entities/CustomError";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { StatusCode } from "../../types";
import IPaymentService from "../../domain/interface/services/IPaymentService";
import IPaymentRepository from "../../domain/interface/repositories/IPaymentRepository";
import { PaymentStatus } from "../../domain/entities/IPayment";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import { IPatient } from "../../domain/entities/IPatient";

export default class AppointmentUseCase {
    bookingAmount: number;

    constructor(
        private appointmentRepository: IAppointmentRepository,
        private slotRepository: ISlotRepository,
        private validatorService: IValidatorService,
        private paymentService: IPaymentService,
        private paymentRepository: IPaymentRepository,
        private patientRepository: IPatientRepository
    ) {
        this.bookingAmount = 300;
    }

    async exec(
        appointmentData: IAppointment,
        patientId: string
    ): Promise<{ sessionId: string, checkoutUrl: string }> {
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

        const checkoutSession = await this.paymentService.createCheckoutSession(
            this.bookingAmount,
            'INR',
            `${process.env.CLIENT_URL}/new-appointment/${appointmentData._id}`,
            `${process.env.CLIENT_URL}/appointment/cancel`,
            { paymentId: payment._id?.toString() }
        );

        const appointmentId = await this.appointmentRepository.create({
            ...appointmentData,
            patientId,
            status: AppointmentStatus.PAYMENT_PENDING,
            paymentId: payment._id!,
        });

        await this.paymentRepository.update({
            _id: payment._id,
            orderId: checkoutSession.id,
            appointmentId
        });

        const patient = await this.patientRepository.findById(patientId);

        return { sessionId: checkoutSession.id, checkoutUrl: checkoutSession.url! };
    }


    async handleStripeWebhook(body: Buffer, signature: string): Promise<void> {
        const event = await this.paymentService.handleWebhookEvent(body, signature);

        if (!event || !event.data || !event.data.object) {
            return
        }

        const paymentIntent = event.data.object as { id: string };

        const payment = await this.paymentRepository.findByOrderId(paymentIntent.id);

        if (!payment) {
            return
        }

        await this.paymentRepository.update({
            _id: payment._id,
            orderId: paymentIntent.id,
            status: PaymentStatus.COMPLETED,
        });

        await this.appointmentRepository.updateAppointmentStatusToConfirmed(payment.appointmentId!);
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
