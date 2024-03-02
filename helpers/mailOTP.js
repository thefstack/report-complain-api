const nodemailer=require("nodemailer")

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'phantomop18@gmail.com',
      pass: 'wuhk oqqf yich bvis'// this must be placed in env
    }
  });

  const sendOTPVerificationEmail=async(email)=>{
    try{
        const otp=generateRandomString(4);
        const mailOptions={
            from:"phantomop18@gmail.com",
            to:email,
            subject:"OTP Verification",
            html:` <p>Your OTP is: ${otp}</p>`
        }
        
          await transporter.sendMail(mailOptions);
        return otp
    }catch(err){
        return -1   
    }
}

module.exports=sendOTPVerificationEmail;