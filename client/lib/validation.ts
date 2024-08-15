import { z } from "zod";

export const loginFormValidation = z.object({
  phone: z.string().refine(phone => /^\+?[1-9]\d{1,14}$/.test(phone), "Invalid phone number"),
  password: z.string().min(4, "Password must be at least 6 characters long"),
  // password: z.string()
  //   .min(8, "Password must be at least 8 characters long")
  //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  //   .regex(/[0-9]/, "Password must contain at least one number")
  //   .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
});

