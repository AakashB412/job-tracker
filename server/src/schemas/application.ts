import { z } from "zod";
export const createApplicationSchema = z.object({
company: z.string().min(1),
role: z.string().min(1),
stage: z.enum(["Applied", "HR Screen", "Technical", "Onsite", "Offer"]).default("Applied"),
status: z.enum(["Active", "Rejected", "Withdrawn", "Offer"]).default("Active"),
appliedAt: z.coerce.date().optional(),
location: z.string().optional(),
employmentType: z.enum(["Full-time", "Internship", "Contract"]).optional(),
source: z.enum(["Referral", "LinkedIn", "Company Site", "Agency", "Other"]).optional(),
nextActionDate: z.coerce.date().optional(),
salaryMin: z.number().int().nonnegative().optional(),
salaryMax: z.number().int().nonnegative().optional(),
currency: z.string().optional(),
tags: z.array(z.string()).optional(),
notes: z.string().max(2000).optional(),
});


export const updateApplicationSchema = createApplicationSchema.partial();
