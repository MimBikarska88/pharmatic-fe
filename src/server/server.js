const express = require("express");
const PORT = 8080;
const app = express();
const { router } = require("./router/router");
const cors = require("cors");

const start = async () => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/", router);
  app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
  });
};
start();
