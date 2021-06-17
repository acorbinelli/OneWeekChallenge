const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const Month = require("../models/monthModel")
const auth = require("../middleware/auth")

router.get("/:month", auth, async (req, res) => {
  const monthname = req.params.month
  console.log("incoming month req")
  try {
    const isEmail = await User.findById(req.user.id).select("confirmed -_id")
    let month = {}
    if (isEmail.confirmed) {
      if (monthname) {
        month = await Month.findOne({ monthname: monthname })
        res.json(month)
      } else {
        res.status(404).json({ msg: "Month not found" })
      }
    } else {
      res.status(401).json({ msg: "Email not confirmed!" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server Error" })
  }
})

module.exports = router
