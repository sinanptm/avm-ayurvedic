import express from "express";
import patientAuthRoutes from "./patient/PatientAuthRoutes";
import { errorHandler } from "../middlewares/errorHandler";
import patientRoutes from "./patient/patientRoutes";

const app = express();
patientRoutes
app.use("/patient/auth", patientAuthRoutes);
app.use("/patient", patientRoutes);
app.use(errorHandler);

export default app;
