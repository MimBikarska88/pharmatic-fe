const {
  validateContactFields,
  validateAddressFields,
} = require("../services/CustomerService");

const CustomerController = {
  register: (req, res) => {
    const contactsErrors = validateContactFields(req.body);
    if (Object.keys(contactsErrors).length > 0) {
      return res.status(400).json({ tabIndex: 0, errors: contactsErrors });
    }
    const addressErrors = validateAddressFields(req.body);
    if (Object.keys(addressErrors).length > 0) {
      return res.status(400).json({ tabIndex: 1, errors: addressErrors });
    }
    return res.status(200).json(req.body);
  },
};
module.exports = { CustomerController };
