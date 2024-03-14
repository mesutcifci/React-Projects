import express, { Express, Request, Response } from "express";

// Create express an app instance
const app: Express = express();

const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from the server" });
});

app.listen(port, () => {
  console.log("express init");
});

console.log("tes221s1t11");