const { body } = require("express-validator")

const userLoginChecks = [
  body("email", "Email Required").isEmail(),
  body("password", "Password is required").not().isEmpty(),
]

module.exports = userLoginChecks
