import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./src/routes";
const app: Application = express();
const router = express.Router();
import "dotenv/config"
require("dotenv").config();
import globalErrorHandler from "./src/controllers/error.controller"
import {cronJob} from "./src/jobs"


// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail')

// const port = 3000;
app.use(express.json());
routes(router);
app.use(
  "/api/v1",
  (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  router
);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + Typescript");
});

app.use(globalErrorHandler);
cronJob.start();

export default app;
