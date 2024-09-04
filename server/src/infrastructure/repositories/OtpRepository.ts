import IOtp from "../../domain/entities/IOtp";
import IOtpRepository from "../../interface/repositories/IOtpRepository";
import OtpModel from "../database/OtpModel";

export default class OtpRepository implements IOtpRepository {
   model = OtpModel;
   async create(otp: number, email: string): Promise<void> {
      await this.model.create({otp,email});
   }
   async findOne(otp: number, email: string): Promise<IOtp | null> {
      return await this.model.findOne({ otp, email });
   }
  
   async deleteMany(email: string): Promise<void> {
      await this.model.deleteMany({email});
   }
}
