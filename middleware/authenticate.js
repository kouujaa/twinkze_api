const config = require("config");
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  console.log(req.cookies);
  const token = req.header("x-authentication-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload;
    next();
  } catch (ex) {
    return res.status(400).send("invalid token");
  }
}

module.exports = authenticate;
