const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).send("Please log in.");

  jwt.verify(token, config.get("PrivateKey"), (err, user) => {
    if (err.message === "jwt expired") {
      return res.status(440).send("Session Expired! Please log in again.");
    } else if (err) {
      return res.status(403).send("Session verification failed!");
    }
    req.user = user;
    next();
  });
};
