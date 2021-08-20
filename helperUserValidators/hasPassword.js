const bcrypt = require("bcrypt");

async function hashPassword(req, res, next) {
  let { password } = req.body;

  //hass password
  const salt = await bcrypt.genSalt(12);
  const hashedpass = await bcrypt.hash(password, salt);
  password = hashedpass;

  next(password);
}

module.exports = hashPassword;
