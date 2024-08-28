import express from "express";
import patientAuthRoutes from "./patient/PatientAuthRoutes";
import { errorHandler } from "../middlewares/errorHandler";

const app = express();

app.use("/patient", patientAuthRoutes);

app.use(errorHandler);

export default app;
