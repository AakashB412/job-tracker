import { Schema, model, Types } from "mongoose";


const applicationSchema = new Schema(
{
userId: { type: Schema.Types.ObjectId, ref: "User", index: true, required: true },
company: { type: String, required: true },
role: { type: String, required: true },
location: String,
employmentType: { type: String, enum: ["Full-time", "Internship", "Contract"], default: "Full-time" },
source: { type: String, enum: ["Referral", "LinkedIn", "Company Site", "Agency", "Other"], default: "Other" },
salaryMin: Number,
salaryMax: Number,
currency: { type: String, default: "USD" },
stage: { type: String, enum: ["Applied", "HR Screen", "Technical", "Onsite", "Offer"], default: "Applied" },
status: { type: String, enum: ["Active", "Rejected", "Withdrawn", "Offer"], default: "Active" },
appliedAt: { type: Date, default: () => new Date() },
nextActionDate: Date,
contacts: [{ name: String, email: String, phone: String, role: String }],
links: { jd: String, posting: String, tracker: String },
resumeVersion: String,
tags: [String],
notes: String,
timeline: [{ at: { type: Date, default: () => new Date() }, action: String, meta: Schema.Types.Mixed }]
},
{ timestamps: true }
);


export const Application = model("Application", applicationSchema);
