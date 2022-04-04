const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    if (decoded.student != null) {
      req.user = decoded.student;
    } else {
      req.user = decoded;
    }
    next();
  });
};

module.exports = {
  verifyToken,
};
