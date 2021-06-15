const express = require("express")
var cors = require("cors")
const connectDB = require("./config/db")

const app = express()

//connect database
connectDB()

// init Middleware
app.use(cors())
app.use(express.json({ extended: false }))

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to OneWeekChallenge API" })
})

//define routes
app.use("/api/login", require("./routes/userLogin"))
app.use("/api/user", require("./routes/userData"))
app.use("/api/signup", require("./routes/userSignup"))
//app.use("/api/admin", require("./routes/admin"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
