import app from "./app";
import dotenv from "dotenv";

dotenv.config();

// Start And Listen Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("express init", port);
});
