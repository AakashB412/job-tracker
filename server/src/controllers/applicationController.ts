import type { Response } from "express";
import { Application } from "../models/Application.js";
import { createApplicationSchema, updateApplicationSchema } from "../schemas/application.js";
import type { AuthRequest } from "../middleware/auth.js";


export async function createApplication(req: AuthRequest, res: Response) {
const parsed = createApplicationSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
const doc = await Application.create({ ...parsed.data, userId: req.user!.id });
res.status(201).json({ item: doc });
}


export async function listApplications(req: AuthRequest, res: Response) {
const { stage, status, q, from, to, page = 1, limit = 20 } = req.query as any;
const filter: any = { userId: req.user!.id };
if (stage) filter.stage = stage;
if (status) filter.status = status;
if (from || to) filter.appliedAt = {
...(from ? { $gte: new Date(from) } : {}),
...(to ? { $lte: new Date(to) } : {}),
};
if (q) filter.$text = { $search: q };
const items = await Application.find(filter)
.sort({ appliedAt: -1 })
.skip((+page - 1) * +limit)
.limit(+limit);
const total = await Application.countDocuments(filter);
res.json({ items, total });
}


export async function getApplication(req: AuthRequest, res: Response) {
const item = await Application.findOne({ _id: req.params.id, userId: req.user!.id });
if (!item) return res.status(404).json({ error: "Not found" });
res.json({ item });
}


export async function updateApplication(req: AuthRequest, res: Response) {
const parsed = updateApplicationSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
const item = await Application.findOneAndUpdate(
{ _id: req.params.id, userId: req.user!.id },
{ $set: parsed.data, $push: { timeline: { action: "update", meta: parsed.data } } },
{ new: true }
);
if (!item) return res.status(404).json({ error: "Not found" });
res.json({ item });
}


export async function removeApplication(req: AuthRequest, res: Response) {
const item = await Application.findOneAndDelete({ _id: req.params.id, userId: req.user!.id });
if (!item) return res.status(404).json({ error: "Not found" });
res.json({ ok: true });
}
