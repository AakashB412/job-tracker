import type { Response } from "express";
import { startOfWeek, subWeeks } from "date-fns";
import type { AuthRequest } from "../middleware/auth.js";
import { Application } from "../models/Application.js";


export async function summary(_req: AuthRequest, res: Response) {
const userId = _req.user!.id;
const since = subWeeks(new Date(), 6);
const appsPerWeek = await Application.aggregate([
{ $match: { userId, appliedAt: { $gte: since } } },
{ $group: { _id: { $isoWeek: "$appliedAt" }, count: { $sum: 1 } } },
{ $sort: { "_id": 1 } }
]);
const byStage = await Application.aggregate([
{ $match: { userId } },
{ $group: { _id: "$stage", count: { $sum: 1 } } },
]);
res.json({ appsPerWeek, byStage });
}
