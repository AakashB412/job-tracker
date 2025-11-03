import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { config } from "../config.js";


export async function register(req: Request, res: Response) {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ error: "Email already registered" });
const passwordHash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, passwordHash });
const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: "7d" });
res.json({ token });
}


export async function login(req: Request, res: Response) {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ error: "Invalid credentials" });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ error: "Invalid credentials" });
const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: "7d" });
res.json({ token });
}


export async function me(req: Request, res: Response) {
// @ts-ignore
const userId = req.user?.id as string;
const user = await User.findById(userId).select("name email createdAt");
if (!user) return res.status(404).json({ error: "User not found" });
res.json({ user });
}
