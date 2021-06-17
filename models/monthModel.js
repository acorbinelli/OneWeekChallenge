const mongoose = require("mongoose")
const Schema = mongoose.Schema

const monthSchema = Schema({
  monthname: { type: String, required: true },
  year: { type: Number, required: true },

  days: [{ day: { type: mongoose.Schema.Types.ObjectId, ref: "Day" } }],
})
module.exports = mongoose.model("Month", monthSchema)
