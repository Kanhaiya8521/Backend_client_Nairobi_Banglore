import { PrismaClient } from "@prisma/client";
import { AppError } from "./../utility/app_error";
// import { AppError } from "./../utility/app_error";
const prisma = new PrismaClient();

const signup = async(data: any):Promise<any> => {
  const user = await prisma.user.create({
    data: data,
  });
  return user;
}
const signin = async(data:any): Promise<any> => {
  const user = await prisma.user.findUnique({
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
  const user = await prisma.user.create({
    data: data,
  });
  return user;
};
const getUser = async (): Promise<any> => {
  const user = await prisma.user.findMany();
  if (!user.length) {
    throw new AppError("Not found user", 404);
  }
  return user;
};
export const user_service = { createUser, getUser, signup, signin };
