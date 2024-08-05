import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs";
import User from '@/src/models/userModel';

export const sendMail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                },
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                },
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "1a9d7859e9b0bf", // X
                pass: "6247b63b415ff4", // X
            },
        });

        const mailOptions = {
            from: "shiva2003rajawat@gmail.com", // sender address
            to: email, // list of receivers
            subject: emailType, // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN
                }/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"
                }
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN
                }/verifyemail?token=${hashedToken} </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);

    } catch (error) {
        throw new Error(error.message);
        console.log(`Something went wrong in sending mail`, error);
    }
}