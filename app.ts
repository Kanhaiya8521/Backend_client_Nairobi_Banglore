import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./src/routes";
const app: Application = express();
const router = express.Router();
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

export default app;
