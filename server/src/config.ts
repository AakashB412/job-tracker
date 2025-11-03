import dotenv from "dotenv";
dotenv.config();


export const config = {
port: Number(process.env.PORT || 8080),
mongoUri: process.env.MONGODB_URI || "",
jwtSecret: process.env.JWT_SECRET || "replace_me",
clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
};
