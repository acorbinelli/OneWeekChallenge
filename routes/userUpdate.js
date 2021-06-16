const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const auth = require("../middleware/auth")

const userSignupChecks = require("../middleware/userSignupChecks")

router.put("/", userSignupChecks, auth, async (req, res) => {
  console.log(`incoming user update request`)
  const JWTSecret = config.get("jwtSecret")
  const { id, name, surname, phone, password, oldpassword, email } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() })
  }

  try {
    let user = await User.findById(id)
    const isMatch = await bcrypt.compare(oldpassword, user.password)
    !isMatch && res.status(400).json({ msg: "Invalid password" })

    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password, salt)

    let userUpdated = await User.findByIdAndUpdate(id, {
      name: name,
      surname: surname,
      phone: phone,
      password: newPassword,
    })

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, JWTSecret, { expiresIn: 3600 }, (err, newToken) => {
      if (err) throw err
      res.json({
        newToken: newToken,
        id: id,
        name: name,
        surname: surname,
        phone: phone,
        email: email,
      })
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: "Server Error" })
  }
})

module.exports = router
