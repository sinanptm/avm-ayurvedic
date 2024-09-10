import IEmailService, { SendMailProps } from "../../domain/interface/services/IEmailService";
import nodemailer from "nodemailer";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const readFileAsync = promisify(fs.readFile);

export default class NodeMailerService implements IEmailService {
   async sendMail({ email, name, pathOfTemplate, link, otp, subject }: SendMailProps): Promise<void> {
      let htmlTemplate = await readFileAsync(path.join(__dirname, pathOfTemplate), "utf-8");

      htmlTemplate = htmlTemplate.replace("{{name}}", name);

      if (otp) {
         htmlTemplate = htmlTemplate.replace("{{otp}}", otp.toString());
      }

      if (link) {
         htmlTemplate = htmlTemplate.replace("{{link}}", link);
      }

      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.NODEMAILER_PASSKEY,
         },
      });

      await transporter.sendMail({
         from: process.env.SENDER_EMAIL,
         to: email,
         subject: subject || "No Reply Mail",
         html: htmlTemplate,
      });
   }
}
