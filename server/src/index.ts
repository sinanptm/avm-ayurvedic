import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB";
import routes from "./presentation/routers/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import bodyParser from 'body-parser'
import { webhook } from "./presentation/routers/appointment/AppointmentRoutes";

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
app.use(helmet());
app.use(
   cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
   })
);
app.post('/api/appointments/webhook', bodyParser.raw({ type: 'application/json' }), webhook);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

connectDB().then(() => {
   app.listen(port, () => {
      if (process.env.NODE_ENV !== "production") {
         console.log(`Server start listening on port: ${port}`);
      }
   });
});
