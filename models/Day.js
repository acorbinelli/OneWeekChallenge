const mongoose = require("mongoose")

const DaySchema = mongoose.Schema({
  date: { type: Number, required: true },
  slots: { type: Number, required: true },
  bookings: { type: Array, required: true },
})

module.exports = mongoose.model("day", DaySchema)
