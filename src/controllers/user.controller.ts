import { Request, Response } from "express";
import { user_service } from "./../services";
import { catchAsync } from "./../utility/catch_async";
import { userSignupValidation } from "./../validation/user.validation";
import { AppError } from "./../utility/app_error";
const signup = async (req: Request, res: Response) => {
  const {error, value } = userSignupValidation(req.body);
   if (error) {
     throw new AppError(error.details[0].message, 400);
   }
  // const data = {
  //   first_name: req.body.first_name,
  //   mid_name: req.body.mid_name,
  //   last_name: req.body.last_name,
  //   phone: req.body.phone,
  //   email: req.body.email,
  //   image: req.body.image,
  //   role: req.body.role,
  //   password: req.body.password,
  // };
  const user = await user_service.signup(value);
  return res.status(200).json({
    success: true,
    data: user,
  });
};

const signin = async (req: Request, res: Response) => {
  const data = {email: req.body.email, password: req.body.password}
  const user = await user_service.signin(data);
  return res.status(200).json({
    success: true,
    data: user,
  })
}
const createUser = async (req: Request, res: Response) => {
  const user = await user_service.createUser(req.body);
  return res.status(200).json({
    success: true,
    data: user,
  });
};

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
  signup: catchAsync(signup),
  signin: catchAsync(signin),
};
