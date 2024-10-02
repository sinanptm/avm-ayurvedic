import { z } from 'zod'
export const medicationSchema = z.object({
    name: z.string().min(1, "Medication name is required"),
    dosage: z.string().min(1, "Dosage is required"),
    frequency: z.string().min(1, "Frequency is required"),
    duration: z.string().min(1, "Duration is required"),
    additionalInstructions: z.string().optional(),
})

export const prescriptionSchema = z.object({
    medications: z.array(medicationSchema).min(1, "At least one medication is required"),
    notes: z.string().optional(),
})