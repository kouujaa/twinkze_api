async function userExistCheck(req, res, next) {
  const { email, userName, phoneNumber } = req.body;

  //check if email already in use
  let found = await Customer.findOne({ email });
  if (found) return res.status(400).send("email already taken");

  //check if username already in use
  found = await Customer.findOne({ userName });
  if (found) return res.status(400).send("user name taken");

  // check if phone number already in use
  found = await Customer.findOne({ phoneNumber });
  if (found) return res.status(400).send("phone number already in use");

  next();
}

module.exports = userExistCheck;
