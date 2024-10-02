import { AppointmentStatus } from "../../domain/entities/IAppointment";
import IVideoSection, { VideoSectionStatus } from "../../domain/entities/IVideoChatSection";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import { IVideoSectionRepository } from "../../domain/interface/repositories/IVideoSectionRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { addDays } from "../../utils/date-formatter";

export default class GetVideoSectionUseCase {
    constructor(
        private readonly videoSectionRepository: IVideoSectionRepository,
        private readonly validatorService: IValidatorService,
        private readonly appointmentRepository: IAppointmentRepository
    ) { }

    async getSectionById(id: string): Promise<IVideoSection | null> {
        this.validatorService.validateIdFormat(id)
        return await this.videoSectionRepository.findById(id);
    }

    async getSectionsByDoctorId(doctorId: string): Promise<IVideoSection[] | []> {
        const limit = 10
        const sections = await this.videoSectionRepository.findAllSectionsByDoctorId(doctorId, VideoSectionStatus.PENDING, limit)
        return sections ? sections : [];
    }

    async getSectionInOneDayDoctor(doctorId: string): Promise<IVideoSection[] | []> {
        this.validatorService.validateIdFormat(doctorId);
        const currentTime = new Date();
        const afterOneDay = addDays(currentTime, 2);
        const sections = await this.videoSectionRepository.findByStartTimeRangeByDoctorId(
            currentTime.toISOString(),
            afterOneDay.toISOString(),
            doctorId
        );
        const ids = sections?.map(section => section.appointmentId!.toString());
        if(ids){
            const appointments = await this.appointmentRepository.findManyByIds(ids as string[]);
            const confirmedAppointments = appointments?.filter(appointment => appointment.status === AppointmentStatus.CONFIRMED);
            const confirmedAppointmentsIds = confirmedAppointments?.map(appointment => appointment._id!.toString());
            const filteredSections = sections?.filter(section => confirmedAppointmentsIds?.includes(section.appointmentId!.toString()));
            return filteredSections ?? [];
        }

        return [];
    }

    async getSectionsInOneDayPatient(patientId: string): Promise<IVideoSection[] | []> {
        this.validatorService.validateIdFormat(patientId);
    
        const currentTime = new Date();
        const afterTwoDays = addDays(currentTime, 2);
    
        const sections = await this.videoSectionRepository.findByStartTimeRangeByPatientId(
            currentTime.toISOString(),
            afterTwoDays.toISOString(),
            patientId
        );
    
        const ids = sections?.map(section => section.appointmentId!.toString());    
        if (ids && ids.length > 0) {
            const appointments = await this.appointmentRepository.findManyByIds(ids as string[]);
            const confirmedAppointments = appointments?.filter(appointment => appointment.status === AppointmentStatus.CONFIRMED);
            const confirmedAppointmentsIds = confirmedAppointments?.map(appointment => appointment._id!.toString());    
            const filteredSections = sections?.filter(section => confirmedAppointmentsIds?.includes(section.appointmentId!.toString()));    
            return filteredSections ?? [];
        }
    
        return [];
    }
    
}
