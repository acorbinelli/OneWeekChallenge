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
    const slots = await Day.findById(day).select("slots reserved bookings -_id")
    if (!slots.reserved) {
      slots.reserved = parseInt(slots.reserved) || 0
    }

    if (account.confirmed && !account.admin) {
      if (
        add &&
        !remove &&
        slots.reserved < slots.slots &&
        slots.bookings.indexOf(account.email) === -1
      ) {
        await Day.findByIdAndUpdate(day, {
          $push: { bookings: account.email },
        })
        res.json("added booking")
      } else if (!add && remove && slots.reserved > 0) {
        await Day.findByIdAndUpdate(day, {
          $pull: { bookings: account.email },
        })
        res.json("removed booking")
      } else {
        res.status(404).json({ msg: "Add or Remove booking !" })
      }
    } else if (account.confirmed && account.admin) {
      if (
        add &&
        !remove &&
        !booking &&
        slots.reserved < slots.slots &&
        slots.bookings.indexOf(account.email) === -1
      ) {
        await Day.findByIdAndUpdate(day, {
          $push: { bookings: account.email },
        })

        res.json({ msg: "Added your email to booking list" })
      } else if (!add && remove && !booking && slots.reserved > 0) {
        await Day.findByIdAndUpdate(day, {
          $pull: { bookings: account.email },
        })
        res.json({ msg: "Removed your email from  booking list" })
      } else if (
        add &&
        !remove &&
        booking &&
        slots.reserved < slots.slots &&
        slots.bookings.indexOf(account.email) === -1
      ) {
        await Day.findByIdAndUpdate(day, {
          $push: { bookings: booking },
        })
        res.json({ msg: "Added your specified email to booking list" })
      } else if (!add && remove && booking && slots.reserved > 0) {
        await Day.findByIdAndUpdate(day, {
          $pull: { bookings: booking },
        })
        res.json({ msg: "Removed your specified email from booking list" })
      } else {
        res.status(404).json({ msg: "Incorrect operation" })
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
