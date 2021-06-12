const express = require("express")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const router = express.Router()

const User = require("../models/User")

// @route   GET api/user
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("name", "Please include a valid name (alpha characters)").isAlpha(),
    check("surname", "Name is required").not().isEmpty(),
    check(
      "surname",
      "Please include a valid surname (alpha characters)"
    ).isAlpha(),
    check("email", "Please include a valid email. Must be company email")
      .isEmail()
      .not()
      .isEmpty()
      .contains("oneweekchallengeapp.com"),

    check(
      "password",
      "Please ender a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("phone", "Please enter a valid phone number").isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, surname, email, password, phone } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ msg: "User already exists" })
      }

      user = new User({ name, surname, email, password, phone })

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      res.send("User saved")
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router
