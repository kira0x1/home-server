import { getUptime } from "./utils";
import express from "express";

const app = express();
const port = Number(Bun.env.PORT) || 3000;
const hostname = Bun.env.HOST as string;

app.get("/uptime", (req, res) => {
  res.json({ uptime: getUptime() });
});

app.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});
