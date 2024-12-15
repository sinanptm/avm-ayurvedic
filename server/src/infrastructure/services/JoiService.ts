import Joi from "joi";
import { StatusCode } from "@/types";
import IValidatorService from "@/domain/interface/services/IValidatorService";
import CustomError from "@/domain/entities/CustomError";

export default class JoiService implements IValidatorService {
   public validateRequiredFields(input: object): void {
      const schema = Joi.object().keys(
         Object.keys(input).reduce((acc, key) => {
            acc[key] = Joi.required();
            return acc;
         }, {} as any)
      );

      const { error } = schema.validate(input);
      if (error) {
         throw new CustomError(
            `Missing required fields: ${error.details.map((detail) => detail.message).join(", ")}`,
            StatusCode.BadRequest
         );
      }
   }

   public validateEmailFormat(email: string): boolean {
      const schema = Joi.string().email();
      const { error } = schema.validate(email);
      if (error) {
         throw new CustomError("Invalid email format", StatusCode.BadRequest);
      }
      return true;
   }

   public validateLength(field: string, minLength: number, maxLength: number = Infinity): boolean {
      const schema = Joi.string().min(minLength).max(maxLength);
      const { error } = schema.validate(field);
      if (error) {
         throw new CustomError(
            `Invalid length for field, expected between ${minLength} and ${maxLength} characters`,
            StatusCode.BadRequest
         );
      }
      return true;
   }

   public validateIdFormat(id: string): boolean {
      const schema = Joi.string().pattern(new RegExp("^[a-fA-F0-9]{24}$"));
      const { error } = schema.validate(id);
      if (error) {
         throw new CustomError("Invalid ID format", StatusCode.BadRequest);
      }
      return true;
   }

   public validateMultipleIds(ids: string[]): boolean {
      const schema = Joi.array().items(Joi.string().pattern(new RegExp("^[a-fA-F0-9]{24}$")));
      const { error } = schema.validate(ids);
      if (error) {
         throw new CustomError("Invalid ID format", StatusCode.BadRequest);
      }
      return true;
   }

   public validatePhoneNumber(phoneNumber: string): boolean {
      const schema = Joi.string().min(4).max(15);
      const { error } = schema.validate(phoneNumber);
      if (error) {
         throw new CustomError("Invalid phone number format", StatusCode.BadRequest);
      }
      return true;
   }

   public validateDateFormat(date: string): boolean {
      const schema = Joi.date().iso();
      const { error } = schema.validate(date);
      if (error) {
         throw new CustomError("Invalid date format", StatusCode.BadRequest);
      }
      return true;
   }

   public validateTimeFormat(time: string): boolean {
      const schema = Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d) (AM|PM)$/);

      const { error } = schema.validate(time);
      if (error) {
         throw new CustomError('Invalid time format, must be in "HH:MM AM/PM" format', StatusCode.BadRequest);
      }
      return true;
   }

   public validateEnum(field: string, enumValues: string[]): boolean {
      const schema = Joi.string().valid(...enumValues);
      const { error } = schema.validate(field);
      if (error) {
         throw new CustomError(
            `Invalid value for field, expected one of: ${enumValues.join(", ")}`,
            StatusCode.BadRequest
         );
      }
      return true;
   }

   public validatePassword(password: string): boolean {
      const schema = Joi.string()
         .min(6)
         .max(70)
         .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
      const { error } = schema.validate(password);
      if (error) {
         throw new CustomError(
            "Password must be at least 6 characters, include at least one uppercase letter, one number, and one special character",
            StatusCode.UnprocessableEntity
         );
      }
      return true;
   }

   public validateBoolean(value: any): boolean {
      const schema = Joi.boolean();
      const { error } = schema.validate(value);
      if (error) {
         throw new CustomError("Invalid boolean value", StatusCode.BadRequest);
      }
      return true;
   }
}
