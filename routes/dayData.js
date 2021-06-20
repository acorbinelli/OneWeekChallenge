const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Day = require("../models/dayModel");
const auth = require("../middleware/auth");

router.get("/:day", auth, async (req, res) => {
  const day = req.params.day;

  try {
    const account = await User.findById(req.user.id).select(
      "admin email confirmed -_id"
    );
    const dayData = await Day.findById(day).select(
      "_id day month year slots bookings monthname"
    );
    if (dayData) {
      if (account.confirmed && !account.admin) {
        const bookingsLength = dayData.bookings.length;
        let accountPresent = false;

        if (
          bookingsLength > 0 &&
          dayData.bookings.indexOf(account.email) > -1
        ) {
          accountPresent = true;
        } else {
          accountPresent = false;
        }
        dayData.bookings = undefined;
        res.json({
          dayData,
          present: accountPresent,
          admin: false,
          que: `${bookingsLength} / ${dayData.slots}`,
        });
      } else if (account.confirmed && account.admin) {
        const bookingsLength = dayData.bookings.length;
        let accountPresent = false;
        if (
          bookingsLength > 0 &&
          dayData.bookings.indexOf(account.email) > -1
        ) {
          accountPresent = true;
        } else {
          accountPresent = false;
        }
        res.json({
          dayData,
          present: accountPresent,
          admin: true,
          que: `${dayData.bookings.length} / ${dayData.slots}`,
        });
      } else {
        res.status(401).json({ msg: "Please confirm email" });
      }
    } else {
      res.status(500).json({ msg: "Server Error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
