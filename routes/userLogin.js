const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const userLoginChecks = require("../middleware/userLoginChecks")

router.post("/", userLoginChecks, async (req, res) => {
  console.log(`incoming login request from: ${req.body.email}`)
  const JWTSecret = config.get("jwtSecret")
  const { email, password } = req.body

  const errors = validationResult(req)
  !errors.isEmpty() && res.status(400).json({ msg: errors.array() })

  try {
    const user = await User.findOne({ email })
    !user && res.status(400).json({ msg: "There is no account for this email" })

    const isMatch = await bcrypt.compare(password, user.password)
    !isMatch && res.status(400).json({ msg: "Invalid Credentials" })

    const payload = { user: { id: user.id } }

    jwt.sign(payload, JWTSecret, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err
      res.json({ token: token, id: user.id })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server Error" })
  }
})

module.exports = router
