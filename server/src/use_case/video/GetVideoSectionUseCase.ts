import IVideoSection from "../../domain/entities/IVideoChatSection";
import { IVideoSectionRepository } from "../../domain/interface/repositories/IVideoSectionRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { addHours } from "../../utils/date-formatter";

export default class GetVideoSectionUseCase {
    constructor(
        private readonly videoSectionRepository: IVideoSectionRepository,
        private readonly validatorService: IValidatorService
    ) { }

    async getSectionById(id: string): Promise<IVideoSection | null> {
        this.validatorService.validateIdFormat(id)
        return await this.videoSectionRepository.findById(id);
    }

    async getSectionByAppointmentId(appointmentId: string): Promise<IVideoSection | null> {
        this.validatorService.validateIdFormat(appointmentId)
        return await this.videoSectionRepository.findByAppointmentId(appointmentId);
    }

    async getSectionsInOneHourDoctor(doctorId: string): Promise<IVideoSection[] | []> {
        this.validatorService.validateIdFormat(doctorId)
        const currentTime = new Date();
        const afterOneHour = addHours(currentTime, 1);
        const sections = await this.videoSectionRepository.findByStartTimeRangeByDoctorId(currentTime.toISOString(), afterOneHour.toISOString(), doctorId);
        return sections ?? [];
    }

    async getSectionsInOneHourPatient(patientId: string): Promise<IVideoSection[] | []> {
        this.validatorService.validateIdFormat(patientId)
        const currentTime = new Date();
        const afterOneHour = addHours(currentTime, 1);
        const sections = await this.videoSectionRepository.findByStartTimeRangeByPatientId(currentTime.toISOString(), afterOneHour.toISOString(), patientId);
        return sections ?? [];
    }
}
