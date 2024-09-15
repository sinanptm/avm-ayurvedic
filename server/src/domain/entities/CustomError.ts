import { StatusCode } from "../../types";

export default class AppError extends Error {
  public statusCode: StatusCode;
  public code?: string;
  public details?: any;

  constructor(message: string, statusCode: StatusCode, code?: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
  public toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      code: this.code
    };
  }
}
