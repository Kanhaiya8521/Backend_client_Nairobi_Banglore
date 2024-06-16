// import { Response } from "express";

export class AppError extends Error {
  statusCode: number;
  success: boolean;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode || 500;
    this.success = false;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor)

    // Error.captureStackTrace(this, this.constructor);
  }
}

// export const sendUnAuthorizedError = (
//   res: Response,
//   message = "UNAUTHORIZED"
// ): any => {
//   try {
//     return res.status(401).json({
//       success: false,
//       message,
//     });
//   } catch (err) {
//     throw err;
//   }
// };
