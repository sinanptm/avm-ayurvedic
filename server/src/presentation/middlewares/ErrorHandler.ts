import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../types/index";

export default class ErrorHandler {
   exec(err: any, req: Request, res: Response, next: NextFunction) {
      console.error("❌ Error:", err);

      const statusCode = err.statusCode || StatusCode.InternalServerError;
      const message = err.message || "Internal Server Error";

      if (err.code && err.code === 11000) {
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
         return res.status(StatusCode.Unauthorized).json({ message });
      } else if (message.includes("Patient is blocked")) {
         return res.status(StatusCode.Forbidden).json({ message });
      } else if (message.includes("Patient Not Found")) {
         return res.status(StatusCode.NotFound).json({ message });
      } else if (message.includes("getaddrinfo ENOTFOUND smtp.gmail.com")) {
         return res.status(StatusCode.InternalServerError).json({
            message: "We are Having Issue with Email Service",
         });
      } else if (message.includes("Patient With Email Already Exists")) {
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
