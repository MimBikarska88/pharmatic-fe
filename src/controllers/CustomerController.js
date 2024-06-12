const { validateContactFields } = require("../services/CustomerService");

const CustomerController = {
  register: (req, res) => {
    console.log(req.body);
    const errors = validateContactFields(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ tabIndex: 0, errors });
    }
  },
};
module.exports = { CustomerController };
