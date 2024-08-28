import { Request } from "express";

export interface CustomRequest extends Request {
    patient?: {
        email: string;
        id: string;
    };
}
