import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT;

// custom imports
import UserRoute from "./routes/UserRoute.js";
import { connectToDb } from "./DB/connectToDb.js";

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", UserRoute);
app.listen(PORT, () => {
  connectToDb();
  console.log(`Listening on port: ${PORT}`);
});
