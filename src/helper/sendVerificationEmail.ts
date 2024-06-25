import nodemailer from 'nodemailer';
import VerificationEmail from '../../emails/VerifyEmail';
import { ApiResponse } from '@/types/ApiResponse';
import { renderToStaticMarkup } from 'react-dom/server';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_PASSWORD
    },
  });
  
export  async function sendEmail (email: string, username: string, code: string): Promise<ApiResponse>{
  const capitalizeUsername = (username: string) => {
    return username.charAt(0).toUpperCase() + username.slice(1);
  };
    const mailOptions = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: "Chef's Recipe | Verification Code",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        <style>
          /* Define your styles here */
          .section {
            font-family: Roboto, Verdana, sans-serif;
            line-height: 1.6;
            padding: 20px;
            border: 1px solid #eaeaea;
            border-radius: 5px;
            max-width: 600px;
            margin: auto;
          }
          .heading {
            color: #333;
            text-align: center;
          }
          .otp-box {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            font-size: 20px;
            font-weight: bold;
          }
        </style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap">
      </head>
      <body style="margin: 0; padding: 0;">
      
        <div class="section">
          <div class="heading"><h2>Hello ${capitalizeUsername(username)},</h2></div>
          <div><p>Thank you for signing up for <strong>Chef's Recipe</strong>! We're thrilled to welcome you aboard.</p></div>
          <div><p>Chef's Recipe is your go-to platform for exploring a world of culinary delights, sharing recipes, and connecting with fellow food enthusiasts.</p></div>
          <div><p>To complete your registration, please use the OTP below:</p></div>
          <div style="text-align: center; margin: 20px 0;">
            <div class="otp-box">${code}</div>
          </div>
          <div><p>If you didn't sign up for Chef's Recipe, please disregard this email.</p></div>
          <div><p>Happy cooking!<br>The Chef's Recipe Team<br>Project GitHub: <a href="https://github.com/Dharam-IN/chefs-recipe" target="_blank">Chef's Recipe</a></p></div>
        </div>
      
      </body>
      </html>
      `
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
  
