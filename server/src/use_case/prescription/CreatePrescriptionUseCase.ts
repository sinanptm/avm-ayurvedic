import CustomError from "../../domain/entities/CustomError";
import IPrescription, { PrescriptionStatus } from "../../domain/entities/IPrescription";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IPrescriptionRepository from "../../domain/interface/repositories/IPrescriptionRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { StatusCode } from "../../types";

export default class CreatePrescriptionUseCase {
    constructor(
        private validatorService: IValidatorService,
        private prescriptionRepository: IPrescriptionRepository,
        private appointmentRepository: IAppointmentRepository
    ) { }

    async create(doctorId: string, prescription: IPrescription): Promise<void> {
        await this.validatePrescription({ doctorId, ...prescription });        
        this.prescriptionRepository.create({ doctorId, ...prescription, status:PrescriptionStatus.ISSUED });
    };

    async update(prescription: IPrescription): Promise<void> {
        this.validatorService.validateRequiredFields({ id: prescription._id });
        this.validatorService.validateIdFormat(prescription._id!);
        await this.prescriptionRepository.update(prescription._id!, prescription);
    }

    private async validatePrescription({ appointmentId, medications, notes, patientId, doctorId }: IPrescription):Promise<void> {
        this.validatorService.validateRequiredFields({ doctorId, appointmentId, notes, patientId, medications });
        this.validatorService.validateMultipleIds([doctorId!, appointmentId!, patientId!]);
        medications?.forEach(({ dosage, duration, frequency, name }) => {
            this.validatorService.validateRequiredFields({ dosage, duration, frequency, name });
        });
        const appointment = await this.appointmentRepository.findById(appointmentId!);
        if (!appointment) {
            throw new CustomError("Appointment not found", StatusCode.NotFound);
        }
    }
}