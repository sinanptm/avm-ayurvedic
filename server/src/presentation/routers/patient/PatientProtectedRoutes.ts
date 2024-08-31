import express from "express";
import PatientAuthMiddleware from "../../middlewares/PatientAuthMiddleware";
import TokenService from "../../../infrastructure/services/TokenService";

const patientRoutes = express();

const tokenService = new TokenService();
const authenticatePatient = new PatientAuthMiddleware(tokenService);

patientRoutes.get("/profile", authenticatePatient.exec, (req, res, next) => {
   res.status(200).json({ name: "sinan", age: 19, phone: 12312312312 });
});

export default patientRoutes;
