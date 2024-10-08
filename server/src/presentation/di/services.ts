import NodeMailerService from "../../infrastructure/services/NodeMailerService";
import GeminiBotService from "../../infrastructure/services/GeminiBotService";
import S3StorageService from "../../infrastructure/services/S3StorageService";
import BcryptService from "../../infrastructure/services/BcryptService";
import StripeService from "../../infrastructure/services/StripeService";
import UUIDService from "../../infrastructure/services/UUIDService";
import JWTService from "../../infrastructure/services/JWTService";
import JoiService from "../../infrastructure/services/JoiService";

export const nodeMailerService = new NodeMailerService();
export const geminiBotService = new GeminiBotService();
export const s3StorageService = new S3StorageService();
export const bcryptService = new BcryptService();
export const stripeService = new StripeService();
export const uuidService = new UUIDService();
export const jwtService = new JWTService();
export const joiService = new JoiService();
