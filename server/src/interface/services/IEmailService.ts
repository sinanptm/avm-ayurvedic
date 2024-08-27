export default interface IEmailService {
   sendOtp(email: string, name: string, otp: number): Promise<void>;
}
