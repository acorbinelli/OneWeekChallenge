const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const Day = require("../models/dayModel")
const auth = require("../middleware/auth")
const email = require("../utils/email")

router.put("/:day", auth, async (req, res) => {
  const day = req.params.day
  const { add, remove, booking } = req.body
  try {
    const account = await User.findById(req.user.id).select(
      "admin confirmed email -_id"
    )
    const slots = await Day.findById(day).select("slots bookings -_id")

    if (account.confirmed && !booking) {
      if (
        add &&
        !remove &&
        !booking &&
        slots.bookings.length < slots.slots &&
        slots.bookings.indexOf(account.email) === -1
      ) {
        await Day.findByIdAndUpdate(day, {
          $push: { bookings: account.email },
        })
        res.json({ msg: "add" })
      } else if (
        !add &&
        remove &&
        !booking &&
        slots.bookings.length > 0 &&
        slots.bookings.indexOf(account.email) >= 0
      ) {
        await Day.findByIdAndUpdate(day, {
          $pull: { bookings: account.email },
        })
        res.json({ msg: "remove" })
      } else {
        res.status(404).json({ msg: "add/remove error 1" })
      }
    } else if (account.confirmed && account.admin && booking) {
      if (
        add &&
        !remove &&
        booking &&
        slots.bookings.length < slots.slots &&
        slots.bookings.indexOf(booking) === -1
      ) {
        await Day.findByIdAndUpdate(day, {
          $push: { bookings: booking },
        })
        res.json({ msg: "add other" })
      } else if (!add && remove && booking && slots.bookings.length > 0) {
        await Day.findByIdAndUpdate(day, {
          $pull: { bookings: booking },
        })
        res.json({ msg: "remove other" })
      } else {
        res.status(404).json({ msg: "add/remove error" })
      }
    } else {
      res.status(401).json({ msg: "Unauthorized" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server Error" })
  }
})

module.exports = router
