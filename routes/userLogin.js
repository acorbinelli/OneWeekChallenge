const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const userLoginChecks = require("../middleware/userLoginChecks");

router.post("/", userLoginChecks, async (req, res) => {
  const JWTSecret = config.get("jwtSecret");
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ msg: errors.array() });
  }

  try {
    if (email && password) {
      console.log(`incoming login request from: ${req.body.email}`);

      const user = await User.findOne({ email: req.body.email });
      let isMatch = false;
      if (user) {
        isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.status(400).json({ msg: "Invalid Credentials" });
        }
      } else if (!user) {
        res.status(400).json({ msg: "There is no account for this email" });
      }

      const payload = { user: { id: user.id } };

      jwt.sign(payload, JWTSecret, { expiresIn: 36000 }, (err, token) => {
        // if (err) throw err;
        res.json({ token: token, id: user.id });
      });
    }
    return;
  } catch (err) {
    // console.error(err.data);
    res.status(500).json({ msg: "Server Error" });
  }
});
process.on("unhandledRejection", (reason, promise) => {
  console.log("reason is", reason);
  console.log("promise is", promise);
  // Application specific logging, throwing an error, or other logic here
});

module.exports = router;
