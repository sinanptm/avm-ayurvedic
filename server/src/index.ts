import express from "express";
import { connectDB } from "./config/connectDB";
import routes from "./presentation/routers/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import bodyParser from "body-parser";
import { webhook } from "./presentation/routers/appointment/AppointmentRoutes";
import { CLIENT_URL, NODE_ENV, PORT } from "./config/env";

const port = PORT || 8080;

const app = express();
app.use(helmet());
app.use(
   cors({
      origin: CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
   })
);
app.post("/api/webhook", bodyParser.raw({ type: "application/json" }), webhook);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

connectDB().then(() => {
   app.listen(port, () => {
      if (NODE_ENV !== "production") {
         console.log(`Server start listening on port: ${port}`);
      }
   });
});
