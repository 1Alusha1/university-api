import express, { Request, Response } from "express";
import connect from "./db";
import dotenv from "dotenv";
import workLoad from "./routes/wokrLoad.route";
import plan from "./routes/plan.route";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/workload", workLoad);
app.use("/api/plan", plan);

connect(process.env.DB_URI as string);
app.listen(process.env.PORT, () => console.log("server was start"));
