const mongoose = require("mongoose")

const MonthSchema = mongoose.Schema({
  monthname: {
    type: String,
    required: true,
  },
  days: {
    type: Array,
  },
})

module.exports = mongoose.model("month", MonthSchema)
