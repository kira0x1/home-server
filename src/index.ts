import dotenv from "dotenv";
import { getUptime } from "./utils.js";
import express from "express";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOST as string;

app.get("/uptime", (req, res) => {
  res.json({ uptime: getUptime() });
});

app.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});
