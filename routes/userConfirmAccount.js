const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const config = require("config")

const checkToken = async function (req, res, next) {
  const token = req.params.token

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "Invalid Link" })
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"))

    req.user = decoded.user

    next()
  } catch (err) {
    console.log(err.message)
    res.status(401).json({ msg: "Invalid link" })
  }
}

router.get("/:token", checkToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { confirmed: true })
  } catch (err) {
    res.json({ msg: "DB error" })
  }
  res.json({ msg: "Email is now confirmed !" })
})

module.exports = router
