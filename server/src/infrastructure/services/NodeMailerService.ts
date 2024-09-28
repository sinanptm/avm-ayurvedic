import IEmailService, { SendMailProps } from "../../domain/interface/services/IEmailService";
import nodemailer from "nodemailer";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { NODEMAILER_PASSKEY, SENDER_EMAIL } from "../../config/env";

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
            user: SENDER_EMAIL,
            pass: NODEMAILER_PASSKEY,
         },
      });

      await transporter.sendMail({
         from: SENDER_EMAIL,
         to: email,
         subject: subject || "No Reply Mail",
         html: htmlTemplate,
      });
   }
}
