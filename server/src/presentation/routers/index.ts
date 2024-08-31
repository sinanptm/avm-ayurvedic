import express from "express";
import AuthRoutes from "./patient/PatientAuthRoutes";
import ProtectedRoutes from "./patient/PatientProtectedRoutes";
import { errorHandler } from "../middlewares/errorHandler";

const app = express();
app.use("/patient/auth", AuthRoutes);
app.use("/patient", ProtectedRoutes);
app.use(errorHandler);

export default app;
