import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";


export interface AuthRequest extends Request { user?: { id: string } }


export function auth(req: AuthRequest, res: Response, next: NextFunction) {
const header = req.headers.authorization;
if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
try {
const token = header.split(" ")[1];
const payload = jwt.verify(token, config.jwtSecret) as { id: string };
req.user = { id: payload.id };
next();
} catch {
return res.status(401).json({ error: "Invalid token" });
}
}
