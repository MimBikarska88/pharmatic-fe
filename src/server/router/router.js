const { Router } = require("express");

const router = Router();
router.get("/customer", (req, res) => {
  res.json("hello");
});
router.post("/customer/register", (req, res) => {
  console.log(req.body);
  res.json({ message: "ok, cool" });
});
module.exports = { router };
