import nodemailer from 'nodemailer';
import VerificationEmail from '../../emails/VerifyEmail';
import { ApiResponse } from '@/types/ApiResponse';
import { renderToStaticMarkup } from 'react-dom/server';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "dharamdotin@gmail.com",
      pass: "Google App Code",
    },
  });
  
export  async function sendEmail (email: string, username: string, code: string): Promise<ApiResponse>{
    const mailOptions = {
      from: 'dharamdotin@gmail.com',
      to: email,
      subject: "Chef's Recipe | Verification Code",
      html: "<p>passwordddd</p>"
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return {success: true, message: "Verification Code Send Successfully!"}
    } catch (error) {
      console.error('Error sending email:', error);
      return {success: false, message: "Error Send Verification Code"}
    }
  };
  
  export default sendEmail;
  
