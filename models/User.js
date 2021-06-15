const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
})

module.exports = mongoose.model("user", UserSchema)
