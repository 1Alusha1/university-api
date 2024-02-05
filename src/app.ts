import express, { Request, Response } from "express";
import connect from "./db";
import workLoad from "./routes/wokrLoad.route";
import plan from "./routes/plan.route";
import subject from "./routes/subject.route";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

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
app.use("/api/subject", subject);

connect(process.env.DB_URI as string);
app.listen(process.env.PORT, () => console.log("server was start"));
