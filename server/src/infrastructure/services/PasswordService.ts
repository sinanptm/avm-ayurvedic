import { IPasswordServiceRepository } from "../../interface/services/IPasswordServiceRepository";
import bcrypt from "bcryptjs";

export default class PasswordService implements IPasswordServiceRepository {
   async hash(password: string): Promise<string> {
      return await bcrypt.hash(password, 10);
   }
   async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
      return await bcrypt.compare(plainPassword, hashedPassword);
   }
}
