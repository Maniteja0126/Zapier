import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tejadarling07@gmail.com',
      pass: process.env.SMTP_PASSWORD, 
    },
  });
  
  export async function sendEmail(to: string, body: string) {
    try {
      const info = await transporter.sendMail({
        from: 'tejadarling07@gmail.com',
        to,
        subject: 'Hello from Zapier',
        text: body,
      });
      console.log("Email sent successfully:", info);
    } catch (error) {
      console.error("Failed to send email with Nodemailer:", error);
    }
  }