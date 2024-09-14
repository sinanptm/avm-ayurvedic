import { AppointmentType } from "@/types";
import { z } from "zod";

export const signinFormValidation = z.object({
   email: z.string().trim().email("Invalid email address"),
   password: z.string().trim().min(4, "Password must be at least 4 characters long"),
});

export const signupFormValidation = z
   .object({
      name: z
         .string()
         .trim()
         .min(3, "Full Name must be at least 3 characters long")
         .max(50, "Name must be at most 50 characters."),
      email: z.string().trim().email("Invalid email address"),
      phone: z
         .string()
         .trim()
         .min(10, "Phone number must be at least 10 digits")
         .max(15, "Phone number must be at most 15 digits"),
      password: z
         .string()
         .trim()
         .min(6, "Password must be at least 6 characters long")
         .max(25, "Password must be at most 25 characters long")
         .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
         .regex(/[a-z]/, "Password must contain at least one lowercase letter")
         .regex(/[0-9]/, "Password must contain at least one number")
         .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
      confirmPassword: z.string().trim().min(6, "Password must be at least 6 characters long"),
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
export const registerFormValidation = z.object({
   birthDate: z.coerce.date().max(new Date(Date.now()), "Please select a birth date before todays."),
   gender: z.enum(["Male", "Female", "Other"]),
   bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
   privacyConsent: z
      .boolean()
      .default(false)
      .refine((val) => val === true, {
         message: "You must agree to the Privacy Consent ",
      }),
   concent: z
      .boolean()
      .default(false)
      .refine((val) => val === true, {
         message: "You must Consent to Treatment",
      }),
   disclosureConsent: z
      .boolean()
      .default(false)
      .refine((val) => val === true, {
         message: "You must consent to disclosure in order to proceed",
      }),
   address: z.string().trim().min(4, "Address is required"),
   occupation: z.string().trim().min(3, "Occupation is required"),
   phone: z.string(),
});

export const updateProfileFormValidation = z.object({
   dob: z.coerce.date().max(new Date(Date.now()), "Please select a birth date before todays."),
   gender: z.enum(["Male", "Female", "Other"]),
   bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
   address: z.string().trim().min(4, "Address is required"),
   occupation: z.string().trim().min(3, "Occupation is required"),
   phone: z.string().min(6, "Please Enter a Valid Phone Number"),
   name: z.string().min(3, "Name is Required"),
});

export const appointmentFormValidation = z.object({
   appointmentType: z.string({
     required_error: "Appointment type is required",
   }).min(1, "Appointment type is required"),
 
   reason: z.string({
     required_error: "Reason for appointment is required",
   }).trim().min(5, "Reason must be at least 5 characters long")
     .max(500, "Reason must not exceed 500 characters"),
 
   note: z.string().trim()
     .min(5, "Notes must be at least 5 characters long")
     .max(1000, "Notes must not exceed 1000 characters")
     .optional(),
 
   date: z.coerce.date()
     .refine((date) => date > new Date(), {
       message: "Appointment date must be in the future",
     }),
  
   doctor: z.string({
     required_error: "Doctor selection is required",
   }).min(1, "Doctor selection is required"),
 
   slotId: z.string({
     required_error: "Time slot selection is required",
   }).min(1, "Time slot selection is required"),
 })