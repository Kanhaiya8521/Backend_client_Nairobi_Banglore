import { PrismaClient } from "@prisma/client";
// import { AppError } from "./../utility/app_error";
const prisma = new PrismaClient();
const createUser = async (data: any) => {
  const user = await prisma.user.create({
    data: data,
  });
  return user;
};
const getUser = async (): Promise<any> => {
  const user = await prisma.user.findMany();
  if (!user.length) {
    throw new Error("Not found user");
  }
  return user;
};
export const user_service = { createUser, getUser };
