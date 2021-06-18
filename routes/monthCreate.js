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
    const newMonthData = {
      _id: new mongoose.Types.ObjectId(),
      monthname: month,
      year: year,
      days: [],
    }

    if (user.admin && !findMonth) {
      for (i = 1; i < numberofdays + 1; i++) {
        console.log(newMonthData._id)
        const newDayData = {
          _id: new mongoose.Types.ObjectId(),
          day: i,
          month: newMonthData._id,
          monthname: month,
          year: year,
          slots: 10,
        }
        newMonthData.days.push(newDayData._id)
        const day = new Day(newDayData)
        await day.save((err) => {
          if (err) console.log(err)
        })
      }
      const newMonth = new Month(newMonthData)

      await newMonth.save(async (err) => {
        if (err) {
          console.log(err)
        }
      })

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
