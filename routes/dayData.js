const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const Day = require("../models/dayModel")
const auth = require("../middleware/auth")

router.get("/:day", auth, async (req, res) => {
  const day = req.params.day

  try {
    const account = await User.findById(req.user.id).select(
      "admin confirmed -_id"
    )
    const dayData = await Day.findById(day).select(
      "_id day month year slots bookings monthname"
    )

    if (account.confirmed && !account.admin) {
      const bookingsLength = dayData.bookings.length
      dayData.bookings = undefined
      res.json({
        dayData,
        admin: false,
        que: `${bookingsLength} / ${dayData.slots}`,
      })
    } else if (account.confirmed && account.admin) {
      res.json({
        dayData,
        admin: true,
        que: `${dayData.bookings.length} / ${dayData.slots}`,
      })
    } else {
      res.status(401).json({ msg: "Please confirm email" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server Error" })
  }
})

module.exports = router
