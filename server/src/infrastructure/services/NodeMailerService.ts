import IEmailService from "../../interface/services/IEmailService";
import nodemailer from "nodemailer";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const readFileAsync = promisify(fs.readFile);

export default class NodeMailerService implements IEmailService {
   async sendOtp(email: string, name: string, otp: number): Promise<void> {
      let htmlTemplate = await readFileAsync(path.join(__dirname, "../../../public/otpEmailTemplate.html"), "utf-8");

      htmlTemplate = htmlTemplate.replace("{{name}}", name);
      htmlTemplate = htmlTemplate.replace("{{otp}}", otp.toString());

      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.NODEMAILER_PASSKEY,
         },
      });

      const id =  await transporter.sendMail({
         from: process.env.SENDER_MAIL,
         to: email,
         subject: "No Reply Mail: Otp Verification",
         html: htmlTemplate,
      });

      console.log(id.messageId);
      
   }

   async sendResetMail(email: string, name: string, resetLink: string): Promise<void> {
      let htmlTemplate = await readFileAsync(
         path.join(__dirname, "../../../public/resetPasswordTemplate.html"),
         "utf-8"
      );

      htmlTemplate = htmlTemplate.replace("{{name}}", name);
      htmlTemplate = htmlTemplate.replace("{{resetLink}}", resetLink);

      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.NODEMAILER_PASSKEY,
         },
      });

      const mail = await transporter.sendMail({
         from: process.env.SENDER_MAIL,
         to: email,
         subject: "No Reply Mail: Password Reset",
         html: htmlTemplate,
      });
      
   };
}
