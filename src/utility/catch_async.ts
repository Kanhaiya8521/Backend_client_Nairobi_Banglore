import { NextFunction, Request, Response } from "express";

export const catchAsync = (fn: Function) => {
    console.log("catchAsync");
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
