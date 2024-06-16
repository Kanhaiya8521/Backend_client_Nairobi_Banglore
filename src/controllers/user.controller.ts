import { Request, Response } from "express"
import {user_service} from "./../services"
import { catchAsync } from "./../utility/catch_async";
const createUser = async(req: Request, res: Response) => {
        const user = await user_service.createUser(req.body);
        return res.status(200).json({
          success: true,
          data: user,
        }); 
}

const getUser = async (req: Request, res: Response) => {
    const user = await user_service.getUser();
    return res.status(200).json({
      success: true,
      data: user,
    });
};

export const user_controller = {
  createUser: catchAsync(createUser),
  getUser: catchAsync(getUser),
};