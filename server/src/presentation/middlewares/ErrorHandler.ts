import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../types/index";
import logger from "../../utils/logger";
import CustomError from "../../domain/entities/CustomError";

export default class ErrorHandler {
   exec(err: any, req: Request, res: Response, next: NextFunction) {
      logger.error(err.message, {
         statusCode: err.statusCode || StatusCode.InternalServerError,
         stack: err.stack,
         path: req.path,
         method: req.method,
         ip: req.ip,
      });


      const statusCode = err.statusCode || StatusCode.InternalServerError;
      const message = err.message || "Internal Server Error";

      if (err instanceof CustomError) {
         return res.status(statusCode).json({ message });
      }

      if (err.code && err.code === 11000) {
         logger.warn("Duplicate key error encountered.");
         return res.status(StatusCode.Conflict).json({
            message: "The resource already exists.",
            error: message,
         });
      }

      if (
         message.includes("getaddrinfo ENOTFOUND smtp.gmail.com") ||
         message.includes("queryA ETIMEOUT smtp.gmail.com")
      ) {
         logger.error("Email service issue encountered.");
         return res.status(StatusCode.InternalServerError).json({
            message: "We are Having Issue with Email Service",
         });
      } 

      res.status(statusCode).json({
         message,
         ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
      });
   }
}
