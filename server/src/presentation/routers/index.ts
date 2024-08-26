import express from "express";
import patientRoutes from "./PatientRoutes";

const app = express();

app.use("/patient", patientRoutes);

export default app;
