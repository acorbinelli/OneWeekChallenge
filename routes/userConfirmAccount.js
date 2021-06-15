const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const config = require("config")

const checkToken = async function (req, res, next) {
  console.log(req.params)
  console.log(req.params.token)
  const token = req.params.token

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "a" })
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
  res.json({ msg: "Account is now confirmed" })
})

module.exports = router
