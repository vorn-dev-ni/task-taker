import express, { Express, Request, Response, NextFunction } from "express";
import  morgan from "morgan"
import { router as TodoRoute } from "./routes";
import { notFoundMiddleware } from "./middleware/error";
import "dotenv/config";
const app: Express = express();
app.use(express.json());
if(process.env.NODE_ENV?.startsWith("development")) {
  app.use(morgan('dev'))
}
console.log(process.env.NODE_ENV)
app.use("/resource", express.static(__dirname + "public/images/"));
app.use("/api", TodoRoute);
app.all("*", notFoundMiddleware);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    message: err.message,
    statusCode: err.statusCode,
  });

});

export default app;
