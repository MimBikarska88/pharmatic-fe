const CustomerController = {
  register: (req, res) => {
    console.log(req.body);
    res.status(200);
    res.json("ok");
  },
};
export default CustomerController;
