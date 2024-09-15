import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../types/index";
import logger from "../../utils/logger";
import { ValidationError } from "../../domain/entities/ValidationError";

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
      
      if (err instanceof ValidationError) {
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
         message.includes("Unauthorized") ||
         message.includes("Invalid Credentials") ||
         message.includes("Invalid Otp")
      ) {
         logger.warn(`Unauthorized access attempt: ${message}`);
         return res.status(StatusCode.Unauthorized).json({ message });
      } else if (message.includes("Patient is Blocked") || message.includes("Not Verified")) {
         logger.warn(`Blocked patient access attempt`);
         return res.status(StatusCode.Forbidden).json({ message });
      } else if (message.includes("Doctor is Blocked")) {
         logger.warn(`Blocked Doctor access attempt`);
         return res.status(StatusCode.Forbidden).json({ message });
      } else if (message.includes("Not Found")) {
         logger.warn(`Not found`);
         return res.status(StatusCode.NotFound).json({ message });
      } else if (
         message.includes("getaddrinfo ENOTFOUND smtp.gmail.com") ||
         message.includes("queryA ETIMEOUT smtp.gmail.com")
      ) {
         logger.error("Email service issue encountered.");
         return res.status(StatusCode.InternalServerError).json({
            message: "We are Having Issue with Email Service",
         });
      } else if (message.includes("Email Already Exists")) {
         logger.warn("Conflict: Email already exists.");
         return res.status(StatusCode.Conflict).json({
            message: "Email Already Exists!",
         });
      } else if (message.includes("Invalid Object Id")) {
         return res.status(StatusCode.UnprocessableEntity).json({ message });
      } else if (message.includes("Invalid Filter")) {
         return res.status(StatusCode.BadRequest).json({ message })
      }

      res.status(statusCode).json({
         message,
         ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
      });
   }
}
