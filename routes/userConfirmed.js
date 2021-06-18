const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const auth = require("../middleware/auth")

router.get("/", auth, async (req, res) => {
  try {
    const confirmed = await User.findById(req.user.id).select("confirmed -_id")

    res.json(confirmed.confirmed)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server Error" })
  }
})

module.exports = router
