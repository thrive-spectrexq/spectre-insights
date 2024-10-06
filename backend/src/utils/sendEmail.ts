// backend/src/utils/sendEmail.ts

import nodemailer from 'nodemailer';
import config from '../config/index';

interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

const transporter = nodemailer.createTransport({
    host: config.emailService.host,
    port: config.emailService.port,
    secure: config.emailService.secure, // true for 465, false for other ports
    auth: {
        user: config.emailService.auth.user,
        pass: config.emailService.auth.pass,
    },
});

export const sendEmail = async (options: EmailOptions): Promise<void> => {
    const mailOptions = {
        from: config.emailService.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};
