import { Request } from "express";

export interface CustomRequest extends Request {
   patient?: {
      email: string;
      id: string;
   };
   admin?: {
      email: string;
      id: string;
   };
   doctor?: {
      email: string;
      id: string;
   };
}

export enum StatusCode {
   Success = 200,
   Created = 201,
   Accepted = 202,
   NoContent = 204,
   BadRequest = 400,
   Unauthorized = 401,
   PaymentError = 402,
   Forbidden = 403,
   NotFound = 404,
   Conflict = 409,
   UnprocessableEntity = 422,
   InternalServerError = 500,
   NotImplemented = 501,
   BadGateway = 502,
   ServiceUnavailable = 503,
}

export enum Cookie {
   Admin = "adminToken",
   Patient = "patientToken",
   Doctor = "doctorToken",
}

export interface PaginatedResult<T> {
   items: T[];
   totalItems: number;
   currentPage: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPreviousPage: boolean;
}

export enum UserRole {
   Admin = "admin",
   Doctor = "doctor",
   Patient = "patient",
}

// Filters

export enum DoctorsFilter {
   BLOCKED = "blocked",
   NOT_VERIFIED = "not-verified",
   VERIFIED = "verified",
}

export type TokenPayload = {
   id: string;
   role: UserRole;
   email: string;
};
