const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DaySchema = mongoose.Schema({
  day: { type: Number, required: true },
  month: { type: Schema.Types.ObjectId, ref: "Month" },
  monthname: { type: String, required: true },
  year: { type: Number, required: true },
  date: {
    type: String,

    default: function () {
      return `${this.day}/${this.monthname}/${this.year}`
    },
  },
  slots: { type: Number, required: true },
  reserved: Number,
  bookings: [
    {
      type: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
})

module.exports = mongoose.model("Day", DaySchema)
