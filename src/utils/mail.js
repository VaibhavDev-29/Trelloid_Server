import { body } from "express-validator";
import Mailgen from "mailgen";
import nodemailer from "nodemailer"


const sendEmail = async (options) => {

    const mailGenerator = new Mailgen({
        theme : "default",
        product : {
            // this can be used in header and footer of e-mail
            name : "Trelloid",
            link : "https://trelloid.app"
            // product logo
        }
    })


const emailTextual = mailGenerator.generatePlaintext(options.mailGenContent)
const emailHtml = mailGenerator.generate(options.mailGenContent)

// console.log(emailTextual);


const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: parseInt(process.env.MAILTRAP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USER_NAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });;

    // console.log("trans........", transporter);
    

const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: options.email,
      subject: options.subject,
      text: emailTextual,
      html: emailHtml
    };

    // console.log("mailopt", mailOption);
    
    try {
        await transporter.sendMail(mailOption)
    } catch (error) {
        console.error(
      "Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file",
    );
    console.error("Error: ", error);
    }

}



const emailVerificationMailGenContent = (username, verificationUrl) => {

    console.log(username,verificationUrl);
    
    return {
        body : {
            name : username,
            intro : "Welcome to Trelloid! We're very excited to have you on board.",
            action : {
                instruction : "To verify your email please click on the following button:",
                button : {
                    color: "#22BC66", // Optional action button color
                    text: "Verify your email",
                    link: verificationUrl,
                },
                outro : "Need help, or have questions? Just reply to this email, we'd love to help." 
            }
        }
    }
}


const resetPasswordMailGenContent = (username, verificationUrl) => {

    console.log(username,verificationUrl);
    
    return {
        body : {
            name : username,
            intro : "Welcome to Trelloid! Here you can reset your password.",
            action : {
                instruction : "for reset your password click this button:",
                button : {
                    color: "#1757cdff", // Optional action button color
                    text: "Reset-Password",
                    link: verificationUrl,
                },
                outro : "Need help, or have questions? Just reply to this email, we'd love to help." 
            }
        }
    }
}



export  {
    sendEmail,
    emailVerificationMailGenContent,
    resetPasswordMailGenContent
}