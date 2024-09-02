import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB";
import routes from "./presentation/routers/index";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT ||8080;

const app = express();

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
   })
);
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
