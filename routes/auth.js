const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
const config = require("config")

const auth = require("../middleware/auth")

const User = require("../models/User")

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server Error" })
  }
})

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Email Required").isEmail(),
    check("email", "Please include a valid company email").contains(
      "oneweekchallengeapp.com"
    ),

    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err

          res.json({ token: token, id: user.id })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ msg: "Server Error" })
    }
  }
)

module.exports = router
