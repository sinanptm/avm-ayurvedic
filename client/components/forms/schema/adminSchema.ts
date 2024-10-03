import { z } from "zod";

export const signinFormSchema = z.object({
   email: z.string().trim().email("email must be valid"),
   password: z.string().trim().min(4, "Password must be at least 4 characters long"),
});
