"use server";

import prisma from "../../lib/prisma";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const sendMail = async (email: string, emailType: string, userId: string) => {
    console.log("Logging From Mailer ", email, emailType, userId);
    
    try {

        const transport = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        } as SMTPTransport.Options);

        if (emailType == 'VERIFY') {
            
            const salt = bcrypt.genSaltSync(10);
            const verificationToken = await bcrypt.hashSync(email, salt);
            const user = await prisma.users.update({ where: { email: email }, data: { verificationToken, verificationExpiry: new Date(Date.now() + 3600000) } });

            console.log(user);
            
            const mailOptions = {
                from: '"Work Ally" <workally@ayankoley.com>',
                to: email,
                subject: "Verify your email",
                html: `<b>Welcome to Work Ally</b><br /><p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${verificationToken}">here</a> to verify your email!</p><br /><p>Or Copy the link below and paste it in your browser: ${process.env.DOMAIN}/verifyemail?token=${verificationToken}</p>`,
            }

            const mailResponse = await transport.sendMail(mailOptions);

            return mailResponse;

        } else if (emailType == 'RESET') {
            const salt = bcrypt.genSaltSync(10);
            const forgotPasswordToken = await bcrypt.hashSync(email, salt);
            const user = await prisma.users.update({ where: { email: email }, data: { forgotPasswordToken, forgotPasswordExpiry: new Date(Date.now() + 3600000) } });

            const mailOptions = {
                from: '"Work Ally" <workally@ayankoley.com>',
                to: email,
                subject: "Reset your password",
                html: `<b>Welcome to Work Ally</b><br /><p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${forgotPasswordToken}">here</a> to Rest Your Password!</p><br /><p>Or Copy the link below and paste it in your browser: ${process.env.DOMAIN}/resetpassword?token=${forgotPasswordToken}</p>`,
            }

            const mailResponse = await transport.sendMail(mailOptions);

            return mailResponse;
        }

    } catch (error: any) {
        throw new Error(error.message);
    }

}