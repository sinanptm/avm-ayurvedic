import { createLogger, format, transports } from "winston";
import path from "path";
import "winston-daily-rotate-file";

const logDirectory = path.resolve(__dirname, "logs");

const customFormat = format.printf(({ timestamp, level, message, stack, url, data, ...meta }) => {
   const logLevel = level.toUpperCase();
   const urlInfo = url ? ` | URL: ${url}` : "";
   const dataInfo = data ? ` | Data: ${JSON.stringify(data)}` : "";
   return `${timestamp} [${logLevel}]: ${message}${stack ? ` | Stack: ${stack}` : ""}${urlInfo}${dataInfo}${Object.keys(meta).length ? ` | Meta: ${JSON.stringify(meta)}` : ""}`;
});

const logger = createLogger({
   level: "info",
   format: format.combine(
      format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
   ),
   defaultMeta: { service: "service" },
   transports: [
      new transports.DailyRotateFile({
         filename: path.join(logDirectory, "error-%DATE%.log"),
         datePattern: "DD-MM-YYYY",
         level: "error",
         maxSize: "20m",
         maxFiles: "14d",
         zippedArchive: true,
      }),
      new transports.DailyRotateFile({
         filename: path.join(logDirectory, "combined-%DATE%.log"),
         datePattern: "DD-MM-YYYY",
         maxSize: "20m",
         maxFiles: "14d",
         zippedArchive: true,
      }),
   ],
});

if (process.env.NODE_ENV !== "production") {
   logger.add(
      new transports.Console({
         format: format.combine(format.colorize(), customFormat),
      })
   );
}

export default logger;
