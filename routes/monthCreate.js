const express = require("express")
const router = express.Router()

const Day = require("../models/dayModel")
const Month = require("../models/monthModel")
const auth = require("../middleware/auth")
const User = require("../models/userModel")
const mongoose = require("mongoose")

const beautifyText = (text) => {
  const output = String(text).charAt(0).toUpperCase() + String(text).slice(1)
  return output
}

router.post("/", auth, async (req, res) => {
  const { month, year, numberofdays } = req.body

  try {
    const user = await User.findById(req.user.id).select("admin")
    const findMonth = await Month.findOne({ monthname: month, year: year })
    if (user.admin && !findMonth) {
      const days = []
      for (i = 1; i < numberofdays + 1; i++) {
        let newDay = new Day({
          _id: new mongoose.Types.ObjectId(),
          day: i,
          month: beautifyText(month),
          year: year,
          slots: 10,
        })
        await newDay.save()
        days.push(newDay._id)
      }

      const newMonth = new Month({
        monthname: beautifyText(month),
        days: days,
        year: year,
      })

      await newMonth.save()

      res.json({ month: `Month ${month} has been created` })
    } else {
      res
        .status(401)
        .json({ msg: "Unauthorized action or month already existing" })
    }
  } catch (err) {
    console.error(err.message)
    // res.status(500).json({ msg: err.message })
  }
})

module.exports = router
