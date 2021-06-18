import React, { useState, useContext, useEffect } from "react"
import calContext from "../store/calContext"
import authContext from "../store/authContext"

const Day = ({ dayID }) => {
  const [dayData, setDayData] = useState({
    _id: dayID,
    day: "",
    month: "",
    year: "",
    slots: "10",
    reserved: "",
    bookings: [],
  })
  const { token } = useContext(authContext)
  const { getDayHandler, month } = useContext(calContext)

  useEffect(() => {
    getDayHandler(dayID, token)
  }, [token, dayID])

  return <div style={{ backgroundColor: "red" }}></div>
}

export default Day
