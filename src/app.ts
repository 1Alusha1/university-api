import express, { Request, Response } from "express";
import connect from "./db";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());



connect(process.env.DB_URI as string);
app.listen(process.env.PORT, () => console.log("server was start"));
