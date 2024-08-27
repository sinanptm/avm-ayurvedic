import IEmailService from "../../interface/services/IEmailService";
import nodemailer from "nodemailer";
import {promisify} from 'util'
import fs from 'fs'
import path from 'path'


const readFileAsync = promisify(fs.readFile);

export default class EmailService implements IEmailService{

    async sendOtp(email: string, name: string, otp: number): Promise<void> {
        let htmlTemplate = await readFileAsync(path.join(__dirname, '../../../public/otpEmailTemplate.html'), 'utf-8');

        htmlTemplate = htmlTemplate.replace('{{name}}', name);
        htmlTemplate = htmlTemplate.replace('{{otp}}', otp.toString());

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_MAIL,
                pass: process.env.NODEMAILER_PASSKEY,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: 'Your OTP for Verification',
            html: htmlTemplate,
        });

        console.log('Email sent:', info.messageId);
    }

}
