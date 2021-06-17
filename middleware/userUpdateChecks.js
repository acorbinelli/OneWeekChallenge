const { body } = require("express-validator")

const userUpdateChecks = [
  body("name")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .bail()
    .isAlpha()
    .withMessage(
      "Name must be only alphabetical. No numbers or special characters"
    ),
  body("surname")
    .isLength({ min: 2 })
    .withMessage("Surname must be at least 2 characters long")
    .bail()
    .isAlpha()
    .withMessage(
      "Surname must be only alphabetical. No numbers or special characters"
    ),
  body("email", "Email Required").isEmail(),
  body("phone", "Please provide your phone number").isMobilePhone(),
  body("oldpassword")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password length must be at least 8 characters long"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password length must be at least 8 characters long"),
  body("confirmpassword")
    .exists()
    .withMessage("Please confirm password")
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords mismatch"),
]

module.exports = userUpdateChecks
