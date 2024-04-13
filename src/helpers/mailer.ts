import User from "@/models/user.model";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({email,emailType,userId}:any) =>{
try {

    //TODO: configure email for usege

  const hasedToken =  await bcryptjs.hash(userId.toString(),10)

    if(emailType === "VERIFY"){
      const updateUser =   await User.findByIdAndUpdate(userId,{
        $set:{
      verifyToken:hasedToken,
      verifyTokenExpiry:Date.now() + 3600000
        }
      })
      console.log("update user for verify ",updateUser);
      
    }else if(emailType === "RESET"){
         await User.findByIdAndUpdate(userId,{forgotPasswordToken:hasedToken},{forgotPasswordExpiry:Date.now() + 3600000})
    }


  const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "84879d99f79923",
    pass: "da428bf84eeec1"
  }
});

 const mailOptions = {
            from: 'bimlesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
            </p>`
        }

  const mailResponse = await transport.sendMail(mailOptions)
  return mailResponse
} catch (error:any) {
    throw new Error(error.message)
}
}