import { StatusCode } from "../../types";

export default class CustomError extends Error {
  public statusCode: StatusCode
  constructor(message: string, statusCode: StatusCode) {
    super(message);
    this.statusCode = statusCode
  }
}
