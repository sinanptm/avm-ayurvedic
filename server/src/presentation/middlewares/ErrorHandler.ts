import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../types/index";
import logger from "../../utils/logger";

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

      if (err.code && err.code === 11000) {
         logger.warn("Duplicate key error encountered.");
         return res.status(StatusCode.Conflict).json({
            message: "Duplicate key error. The resource already exists.",
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
      } else if (message.includes("Patient is blocked")) {
         logger.warn(`Blocked patient access attempt: ${message}`);
         return res.status(StatusCode.Forbidden).json({ message });
      } else if (message.includes("Patient Not Found")) {
         logger.warn(`Patient not found: ${message}`);
         return res.status(StatusCode.NotFound).json({ message });
      } else if (message.includes("getaddrinfo ENOTFOUND smtp.gmail.com")) {
         logger.error("Email service issue encountered.");
         return res.status(StatusCode.InternalServerError).json({
            message: "We are Having Issue with Email Service",
         });
      } else if (message.includes("Patient With Email Already Exists")) {
         logger.warn("Conflict: Patient with email already exists.");
         return res.status(StatusCode.Conflict).json({
            message: "Patient With Email Already Exists!",
         });
      }

      res.status(statusCode).json({
         message,
         ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
      });
   }
}
