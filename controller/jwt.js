const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

exports.signJWT = (req, res, next) => {
  try {
    const content = {
      id: 1,
      email: req.body.email,
      name: req.body.name,
    };

    const config = {
      expiresIn: "6days", //its optional you can choose start from minute, hours, and days
      issuer: "OPTIONAL",
      audience: req.socket.remoteAddress,
    };

    const token = jwt.sign(content, process.env.SECRET_KEY, config);

    res.json({
      data: config,
      token: token,
    });
  } catch (e) {
    res.json({ error: "username and name is required" });
  }
};

exports.verifyJWT = (req, res, next) => {
  try {
    const data = req.header("Authorization");
    const token = data.split(" ");

    jwt.verify(token[1], process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      Token: "Invalid Token",
    });
  }
};
