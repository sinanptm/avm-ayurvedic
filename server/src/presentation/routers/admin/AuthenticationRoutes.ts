import express from "express";
import AuthenticationController from "../../controllers/admin/AuthenticationController";
import AuthenticationUseCase from "../../../use_case/admin/AuthenticationUseCase";
import DoctorRepository from "../../../infrastructure/repositories/DoctorRepository";
import BcryptService from "../../../infrastructure/services/BcryptService";
import JWTService from "../../../infrastructure/services/JWTService";

const route = express.Router();

const adminRepository = new DoctorRepository();
const passwordService = new BcryptService();
const tokenService = new JWTService();

const authUseCase = new AuthenticationUseCase(adminRepository, passwordService, tokenService);
const authController = new AuthenticationController(authUseCase);

route.post("/login", authController.login.bind(authController));

export default route;
