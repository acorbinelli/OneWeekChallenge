const mongoose = require("mongoose")
const Schema = mongoose.Schema

const monthSchema = Schema({
  _id: Schema.Types.ObjectId,
  monthname: { type: String, required: true },
  year: { type: Number, required: true },
  days: [{ type: Schema.Types.ObjectId, ref: "Day" }],
})
module.exports = mongoose.model("Month", monthSchema)
