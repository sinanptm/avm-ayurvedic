import { BloodTypes, GenderOptions } from "@/constants";
import { z } from "zod";

export const loginFormValidation = z.object({
  phone: z
    .string()
    .refine(
      (phone) => /^\+?[1-9]\d{1,14}$/.test(phone),
      "Invalid phone number"
    ),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

export const registerFormValidation = z.object({
  birthDate: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
  disease: z.string().min(1, "Primary Disease is required"),
  privacyPolicy: z
    .boolean()
    .refine((val) => val === true, "You must agree to the Privacy Policy"),
  concent: z
    .boolean()
    .refine((val) => val === true, "You must Consent to Treatment"),
  disclosureConsent: z
    .boolean()
    .refine((val) => val === true, "You must Consent to Privacy Policy"),
});

export const signupFormValidation = z
  .object({
    name: z
      .string()
      .min(1, "Full Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email address is required"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    // password: z.string()
    //   .min(8, "Password must be at least 8 characters long")
    //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    //   .regex(/[0-9]/, "Password must contain at least one number")
    //   .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    confirmPassword: z
      .string()
      .min(4, "Password must be at least 4 characters long"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The Password did not match",
        path: ["confirmPassword"],
      });
    }
  });
