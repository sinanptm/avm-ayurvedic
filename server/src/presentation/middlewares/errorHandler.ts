import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction)=> {
    console.error(err);

    const statusCode = err.statusCode || 500;

    if (err.code && err.code === 11000) {
        return res.status(409).json({
            message: "Duplicate key error. The resource already exists.",
            error: err.message,
        });
    }

    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
}
