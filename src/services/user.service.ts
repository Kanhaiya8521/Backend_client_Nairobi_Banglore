import { PrismaClient } from "@prisma/client";
import { AppError } from "./../utility/app_error";
// import { AppError } from "./../utility/app_error";
const prisma = new PrismaClient();
import { generateRandomCode, randomNumber } from "./../utility/common";
import { generateHashPassword, generateSalt } from "../utility/bcrypt";
import { sanitizeUsers } from "./../utility/senitize_user";
import { verificationCodeTemplate } from "../utility/verification_code_template";
import { sendSingleMail } from "../utility/sendgrid";

const signup = async(data: any):Promise<any> => {
  const alreadyEmailTaken = await prisma.users.findUnique({
    where: {email: data.email}
  })
  console.log("alreadyEmailTaken", alreadyEmailTaken);
  if(alreadyEmailTaken){throw new AppError("Email already taken", 400)}
  const alreadyPhoneTaken = await prisma.users.findUnique({
    where: {phone: data.phone}
  })
  console.log("alreadyPhoneTaken", alreadyPhoneTaken);
  if(alreadyPhoneTaken){throw new AppError("Phone already taken", 400)}
  const alreadyUsernameTaken = await prisma.users.findUnique({where: {user_name: data.user_name}});
  if(alreadyUsernameTaken){throw new AppError("Username already taken", 400)};
  console.log("alreadyUsernameTaken", alreadyUsernameTaken);

  let referral_code:string;
  let alreadyReferredCode;
  do {
    referral_code = generateRandomCode(8).toUpperCase();
    alreadyReferredCode = await prisma.users.findUnique({
      where: { referral_code: referral_code },
    });
  } while (alreadyReferredCode);
  data.referral_code = referral_code;
  const genSalt = await generateSalt()
  data.password = await generateHashPassword(data.password, genSalt);
  data = await sanitizeUsers(data, ['confirm_password']);

  const user = await prisma.users.create({
    data: data,
  });
  if(!user){throw new AppError("Unable to create user", 400);}

  const verificationCode = randomNumber(6);

  const userOtpVerification = await prisma.usersOTPVerifications.create({
    data: {
      verification_code: verificationCode,
      verification_type: "EMAIL_VERIFICATION",
      verification_code_at: new Date(),
      user_id: user.id,
    }
  })
  if (!userOtpVerification){throw new AppError("Unable to create", 400)} 

   const mail_data = verificationCodeTemplate(
     `${user.first_name} ${user.last_name}`,
     user.email as string,
     verificationCode
   );
   const mail_response = await sendSingleMail(mail_data);
   if (!mail_response.success) {
     throw new AppError(
       mail_response.message +
         " Unable to send mail but user signup successfully",
       400
     );
   }

   return {
     data: user,
     otp_created_time: userOtpVerification.verification_code_at,
     otp_expire_time:
       parseInt(process.env.VERIFICATION_TOKEN_EXPIRES_IN as string) || 5,
   };
}
const signin = async(data:any): Promise<any> => {
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });
  if(user?.password != data.password) {
    throw new AppError("wrong credentials", 401);
  }
  return user;
}
const createUser = async (data: any) => {
  const user = await prisma.users.create({
    data: data,
  });
  return user;
};
const getUser = async (): Promise<any> => {
  const user = await prisma.users.findMany();
  if (!user.length) {
    throw new AppError("Not found user", 404);
  }
  return user;
};
export const user_service = { createUser, getUser, signup, signin };
