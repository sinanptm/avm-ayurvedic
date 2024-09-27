import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../types/index";
import logger from "../../utils/logger";
import CustomError from "../../domain/entities/CustomError";

export default class ErrorHandler {
   constructor() {
      this.exec = this.exec.bind(this);
   }
   exec(error: any, req: Request, res: Response, next: NextFunction) {
      const statusCode = error.statusCode || StatusCode.InternalServerError;
      const message = error.message || "Internal Server Error";
      const clientIp = req.ip || req.connection.remoteAddress;

      if (error instanceof CustomError) {
         logger.warn(`CustomError: ${message}`, {
            statusCode,
            method: req.method,
            path: req.path,
            clientIp,
         });
         return res.status(statusCode).json({ message });
      }

      if (error.code && error.code === 11000) {
         logger.warn("Resource Conflict (Duplicate Entry)", {
            statusCode: StatusCode.Conflict,
            method: req.method,
            path: req.path,
            clientIp,
            error: message,
         });
         return res.status(StatusCode.Conflict).json({
            message: "The resource already exists.",
            error: message,
         });
      }

      if (
         message.includes("getaddrinfo ENOTFOUND smtp.gmail.com") ||
         message.includes("queryA ETIMEOUT smtp.gmail.com")
      ) {
         logger.error("Email Service Error", {
            statusCode: StatusCode.InternalServerError,
            method: req.method,
            path: req.path,
            clientIp,
         });
         return res.status(StatusCode.InternalServerError).json({
            message: "We are having an issue with the Email Service.",
         });
      }

      logger.error(`Unhandled Error: ${message}`, {
         statusCode,
         method: req.method,
         path: req.path,
         clientIp,
         stack: error.stack,
      });

      res.status(statusCode).json({
         message,
         ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
      });
   }
}
