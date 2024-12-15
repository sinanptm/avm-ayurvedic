import IDoctorRepository from "@/domain/interface/repositories/IDoctorRepository";
import IValidatorService from "@/domain/interface/services/IValidatorService";
import IEmailService from "@/domain/interface/services/IEmailService";
import { DoctorsFilter, PaginatedResult, StatusCode } from "@/types";
import CustomError from "@/domain/entities/CustomError";
import IDoctor from "@/domain/entities/IDoctor";
import { CLIENT_URL } from "@/config/env";

export default class AdminDoctorUseCase {
   constructor(
      private doctorRepository: IDoctorRepository,
      private emailService: IEmailService,
      private validatorService: IValidatorService
   ) {}

   async getAll(offset: number, limit: number, type: DoctorsFilter): Promise<PaginatedResult<IDoctor>> {
      const filters = {
         [DoctorsFilter.VERIFIED]: { isVerified: true, isBlocked: false },
         [DoctorsFilter.NOT_VERIFIED]: { isVerified: false, isBlocked: false },
         [DoctorsFilter.BLOCKED]: { isVerified: true, isBlocked: true },
      };

      const { isBlocked, isVerified } = filters[type];
      let data = await this.doctorRepository.findMany(offset, limit, isVerified, isBlocked);

      data.items = data.items.filter((doctor) => doctor.role !== "admin");
      return data;
   }

   async update(doctor: IDoctor, adminEmail: string): Promise<void> {
      if (adminEmail === "admin@gmail.com") {
         console.log(adminEmail);
         throw new CustomError("😊This action is Not Allowed to Demo Admin ❌", StatusCode.BadRequest);
      }
      const updatedDoctor = await this.doctorRepository.update(doctor._id!, doctor!);
      if (!updatedDoctor) throw new CustomError("Not Found", StatusCode.NotFound);
      if (updatedDoctor?.isVerified! && doctor.isVerified) {
         await this.emailService.sendMail({
            email: updatedDoctor.email!,
            name: "Admin",
            pathOfTemplate: "@/../public/notifyVerificationTemplate.html",
            subject: "No Reply Mail: Doctor Verification Notification",
            link: `${CLIENT_URL}/doctor`,
         });
      }
   }
}
