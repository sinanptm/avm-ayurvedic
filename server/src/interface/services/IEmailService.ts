export default interface IEmailService {
   sendOtp(email: string, name: string, otp: number): Promise<void>;
   sendResetMail(email:string,name:string,resetLink:string):Promise<void>;
}
