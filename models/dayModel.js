const mongoose = require("mongoose")

const DaySchema = mongoose.Schema({
  day: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  date: {
    type: String,
    unique: true,
    default: function () {
      return `${this.day}/${this.month}/${this.year}`
    },
  },

  slots: { type: Number, required: true },
  reserved: {
    type: Number,
    default: function () {
      return this.bookings.length
    },
  },
  bookings: [
    {
      type: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
})

module.exports = mongoose.model("Day", DaySchema)
