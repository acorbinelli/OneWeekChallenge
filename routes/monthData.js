const express = require("express")
const router = express.Router()
const User = require("../models/User")
const auth = require("../middleware/auth")

router.get("/:month", auth, async (req, res) => {
  const month = req.params.month

  try {
    const confirmed = await User.findById(req.user.id).select("confirmed -_id")
    if (confirmed) {
      if (month) {
        //TODO: create Month model
      }
    }
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server Error" })
  }
})

module.exports = router
