  import { NextFunction, Request, Response } from "express";
  import { ErrorResponse } from "../utils/Error";
  export const notFoundMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errorResponse = new ErrorResponse("Page not found", 404);
    next(errorResponse);
  };
