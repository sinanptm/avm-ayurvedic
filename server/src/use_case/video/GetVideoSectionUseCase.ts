import IVideoSection from "../../domain/entities/IVideoChatSection";
// import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import { IVideoSectionRepository } from "../../domain/interface/repositories/IVideoSectionRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";

export default class GetVideoSectionUseCase {
    constructor(
        private readonly videoSectionRepository: IVideoSectionRepository,
        private readonly validatorService: IValidatorService
        // private readonly appointmentRepository: IAppointmentRepository
    ) { }

    async getSectionById(id: string): Promise<IVideoSection | null> {
        this.validatorService.validateIdFormat(id)
        return await this.videoSectionRepository.findById(id);
    }

    async getSectionByAppointmentId(appointmentId: string): Promise<IVideoSection | null> {
        this.validatorService.validateIdFormat(appointmentId)
        return await this.videoSectionRepository.findByAppointmentId(appointmentId);
    }

    async getSectionsInOneHour(): Promise<IVideoSection[] | []> {
        const currentTime = new Date();
        const afterOneHour = new Date(currentTime.getTime() + 60 * 60 * 1000);
        const sections = await this.videoSectionRepository.findByStartTimeRange(currentTime.toISOString(), afterOneHour.toISOString());
        return sections ?? [];
    }


}
