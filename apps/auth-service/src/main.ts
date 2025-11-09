/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import router from "./routes/auth.route";

const app = express();

// Parsing JSON, harus ada supaya bisa terima form data
app.use(express.json());

app.use("/api", router);

const port = process.env.PORT || 6001;
const server = app.listen(port, () => {
  console.log(`Auth at http://localhost:${port}/api`);
});
server.on("error", console.error);
