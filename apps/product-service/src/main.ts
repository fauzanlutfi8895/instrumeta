import express from "express";
import { errorMiddleware } from "@packages/error-handler/error-middleware";

const app = express();

app.use(express.json());

app.use(errorMiddleware);

const port = process.env.PORT || 6002;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
