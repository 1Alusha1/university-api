import express, { Request, Response } from "express";
import connect from "./db";
import dotenv from "dotenv";
import workLoad from "./routes/wokrLoad.route";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/workload", workLoad);

connect(process.env.DB_URI as string);
app.listen(process.env.PORT, () => console.log("server was start"));
