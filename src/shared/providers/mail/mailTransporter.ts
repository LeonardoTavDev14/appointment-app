import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const mailTransporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASSWORD,
  },
});
