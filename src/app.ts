import express, { Request, Response } from "express";
import connect from "./db";
import dotenv from "dotenv";
import workLoad from "./routes/wokrLoad.route";
import plan from "./routes/plan.route";
dotenv.config();
import cors from "cors";

const app = express();
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:3001",
  preflightContinue: false,
};

app.use(express.json());
app.use(cors(options));
app.use("/api/workload", workLoad);
app.use("/api/plan", plan);

connect(process.env.DB_URI as string);
app.listen(process.env.PORT, () => console.log("server was start"));
