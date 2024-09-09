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

export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const doctorSignupFormValidation = z
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
      image: z
      .instanceof(File)
      .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
         message: "Only JPEG and PNG files are allowed",
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
         message: "File size should be less than 5MB",
      }),
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
   phone: z.string()
});

export const updateProfileFormValidation = z.object({
   dob: z.coerce.date().max(new Date(Date.now()), "Please select a birth date before todays."),
   gender: z.enum(["Male", "Female", "Other"]),
   bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
   address: z.string().trim().min(4, "Address is required"),
   occupation: z.string().trim().min(3, "Occupation is required"),
   phone: z.string().min(6,'Please Enter a Valid Phone Number'),
   name:z.string().min(3,"Name is Required")
});


export const appointmentFormValidation = z.object({
   appointmentType: z.enum(["outpatient", "inpatient"]),
   reason: z.string().trim().min(5, "Reason must be at least 5 characters long"),
   note: z.string().trim().min(5, "Notes must be at least 5 characters long"),
   schedule: z.coerce.date(),
   payment: z.enum(["online", "Op"]),
   doctor: z.enum(["Shafeek", "Hakeem", "Salih", "Sinan"]),
});
