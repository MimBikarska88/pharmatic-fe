const { Router } = require("express");
const { CustomerController } = require("../../controllers/CustomerController");
const PharmaticRouter = Router();
PharmaticRouter.get("/customer", (req, res) => {
  res.json("hello");
});
PharmaticRouter.post("/customer/register", CustomerController["register"]);
module.exports = {
  PharmaticRouter,
};
