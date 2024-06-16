import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./src/routes";
const app: Application = express();
const router = express.Router();
import "dotenv/config"
require("dotenv").config();
import globalErrorHandler from "./src/controllers/error.controller"
// const port = 3000;
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

export default app;
