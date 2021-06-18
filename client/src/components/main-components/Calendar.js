import React, { Fragment, useContext, useEffect, useState } from "react"
import classes from "./Calendar.module.css"
import Button from "../UI/Button"
import calContext from "../store/calContext"
import authContext from "../store/authContext"

import Day from "./Day"

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const Calendar = () => {
  const { emailconfirmed, month, getMonthHandler, getDayHandler } =
    useContext(calContext)
  const { token } = useContext(authContext)
  const [currentMonth, setCurrentMonth] = useState({ month: "January" })
  const [currentYear, setCurrentYear] = useState(2021)

  useEffect(
    () => {
      getMonthHandler(currentMonth.month, currentYear, token)
    },
    //eslint-disable-next-line
    [token, currentMonth, currentYear]
  )

  const setCurrentMonthHandler = (action) => {
    if (action === "<") {
      console.log("<")
      const index = monthNames.indexOf(currentMonth.month)
      if (index > 0) {
        setCurrentMonth({ ...currentMonth, month: monthNames[index - 1] })
      }
    } else if (action === ">") {
      console.log(">")
      const index = monthNames.indexOf(currentMonth.month)
      if (index < 11) {
        setCurrentMonth({ ...currentMonth, month: monthNames[index + 1] })
      }
    }
  }

  return (
    <Fragment>
      <div className={classes.calendar}>
        <Button
          classType='secondary'
          style={{ gridColumn: "1", gridRow: "1" }}
          onClick={() => setCurrentMonthHandler("<")}
        >
          <span style={{ fontSize: "3rem" }}>{"<"}</span>
        </Button>
        <div
          style={{
            gridArea: "month",
            textAlign: "center",
          }}
        >
          <h1>{currentMonth.month}</h1>
        </div>
        <Button
          classType='secondary'
          style={{ gridColumn: "7", gridRow: "1" }}
          onClick={() => setCurrentMonthHandler(">")}
        >
          <span style={{ fontSize: "3rem" }}>{">"}</span>
        </Button>
        {<Day dayID={"60cd03ea2df11c3dac2b19e3"}></Day>}
      </div>
    </Fragment>
  )
}

export default Calendar
