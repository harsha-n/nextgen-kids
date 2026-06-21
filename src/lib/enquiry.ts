import { z } from "zod";

export const enquirySchema = z.object({
  parentName: z.string().trim().min(2, "Please enter the parent name."),
  childName: z.string().trim().min(2, "Please enter the child name."),
  childAge: z.string().trim().min(1, "Please select the child age."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[0-9+\-\s()]+$/, "Phone number can include digits, spaces, +, -, and ()."),
  email: z.string().trim().email("Please enter a valid email address."),
  program: z.string().trim().min(1, "Please select a program."),
  preferredVisitDate: z.string().trim().optional(),
  message: z.string().trim().max(500, "Message must be under 500 characters.").optional(),
  pageUrl: z.string().trim().url().optional().or(z.literal("")),
  website: z.string().trim().optional()
});

export type EnquiryPayload = z.infer<typeof enquirySchema>;

export type EnquiryApiResponse = {
  ok: boolean;
  message: string;
};
