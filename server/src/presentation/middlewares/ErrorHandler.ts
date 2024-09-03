import { Request, Response, NextFunction } from "express";

export default class ErrorHandler {
   exec(err: any, req: Request, res: Response, next: NextFunction) {
      console.log("❌ Error:", err);

      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      if (err.code && err.code === 11000) {
         return res.status(409).json({
            message: "Duplicate key error. The resource already exists.",
            error: message,
         });
      }

      if (
         message.includes("Unauthorized") ||
         message.includes("Invalid Credentials") ||
         message.includes("Invalid Otp")
      ) {
         return res.status(401).json({ message });
      } else if (message.includes("Patient is blocked")) {
         return res.status(403).json({ message });
      } else if (message.includes("Patient Not Found")) {
         return res.status(404).json({ message });
      } else if (message.includes("getaddrinfo ENOTFOUND smtp.gmail.com")) {
         return res.status(500).json({ message: "We are Having Issue with Email Service" });
      } else if (message.includes("Patient With Email Already Exists")) {
         return res.status(409).json({ message: "Patient With Email Already Exists!" });
      } 
      
      res.status(statusCode).json({
         message,
         ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
      });
   }
}
