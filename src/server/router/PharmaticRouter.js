import { Router } from "express";
import CustomerController from "../../controllers/CustomerController.js";
const PharmaticRouter = Router();
PharmaticRouter.get("/customer", (req, res) => {
  res.json("hello");
});
PharmaticRouter.post("/customer/register", CustomerController["register"]);
export default PharmaticRouter;
