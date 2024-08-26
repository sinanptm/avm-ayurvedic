import express from "express";
import patientRoutes from "./PatientRoutes";
import { errorHandler } from "../middlewares/errorHandler";

const app = express();

app.use("/patient", patientRoutes);

app.use(errorHandler);

export default app;
