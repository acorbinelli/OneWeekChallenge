const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const Email = require("../utils/email")

const userSignupChecks = require("../middleware/userSignupChecks")

router.post("/", userSignupChecks, async (req, res) => {
  console.log(`incoming signup request`)
  const JWTSecret = config.get("jwtSecret")
  const { name, surname, email, phone, password } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() })
  }
  /* !errors.isEmpty() && res.status(400).json({ msg: errors.array() }) */

  try {
    let user = await User.findOne({ email })
    user && res.status(400).json({ msg: "Email already in use" })

    user = new User({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      password: password,
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, JWTSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err
      Email({
        destination: user.email,
        link: `http://localhost/api/signup/confirmaccount/${token}`,
      })
      res.json({ token: token, id: user.id })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server Error" })
  }
})

module.exports = router
