import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createUser = async (data: any) => {
  try {
    const user = await prisma.user.create({
      data: data,
    });
    return user;
  } catch (error) {
    return error.message;
  }
};
const getUser = async(): Promise<any> => {
    try {
        const user = await prisma.user.findMany();
        return user;
    } catch (error) {
        return error.message;
    }
}
export const user_service = {createUser, getUser };
