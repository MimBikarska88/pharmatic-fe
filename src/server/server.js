import express from "express";
import cors from "cors";
import PharmaticRouter from "./router/PharmaticRouter.js";
import { configDatabase } from "./config/mongoConfig.js";
const PORT = 8080;
const app = express();
const start = async () => {
  await configDatabase();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/", PharmaticRouter);
  app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
  });
};
start();
