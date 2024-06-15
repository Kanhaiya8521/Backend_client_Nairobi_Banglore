import { Request, Response } from "express"
import {user_service} from "./../services"
const createUser = async(req: Request, res: Response) => {
    try {
        const user = await user_service.createUser(req.body);
        return res.status(200).json({
          success: true,
          data: user,
        }); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error
        }) 
    }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await user_service.getUser();
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

export const user_controller = {
    createUser,
    getUser
}