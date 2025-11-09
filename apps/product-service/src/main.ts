import express from "express";
import { errorMiddleware } from "@packages/error-handler/error-middleware";
import router from "./routes/product.route";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(errorMiddleware);

const port = process.env.PORT || 6002;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
