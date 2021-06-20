import React, { useContext, useEffect, useState } from "react"
import CalendarContext from "../../store/calendarContext"
import AuthContext from "../../store/authContext"
import classes from "./Calendar.module.css"

import Month from "./Month"
import Year from "./Year"
import DayWrapper from "./DayWrapper"

import { JANUARY, FEBRUARY, MARCH } from "../../types"
const monthsArray = [JANUARY, FEBRUARY, MARCH]

const Calendar = () => {
  const {
    name,
    year,
    getMonthHandler,
    getMonthHandlerCleanup,
    changeMonthHandler,
  } = useContext(CalendarContext)
  const { token } = useContext(AuthContext)

  const [currentMonth, setCurrentMonth] = useState(JANUARY)
  const [currentYear, setCurrentYear] = useState(2021)

  useEffect(() => {
    changeMonthHandler(currentMonth, currentYear)

    return () => {
      changeMonthHandler()
    }
    //eslint-disable-next-line
  }, [currentMonth, currentYear])

  useEffect(() => {
    if (name && year && token) {
      getMonthHandler(name, year, token)
    }
    return () => {
      getMonthHandlerCleanup()
    }
    //eslint-disable-next-line
  }, [name, year, token])

  const buttonChangeMonth = (action) => {
    if (action === "<") {
      if (monthsArray.indexOf(currentMonth) === 0) {
        setCurrentMonth(monthsArray[monthsArray.length - 1])
      } else {
        setCurrentMonth(monthsArray[monthsArray.indexOf(currentMonth) - 1])
      }
    } else if (action === ">") {
      if (monthsArray.indexOf(currentMonth) === monthsArray.length - 1) {
        setCurrentMonth(monthsArray[0])
      } else {
        setCurrentMonth(monthsArray[monthsArray.indexOf(currentMonth) + 1])
      }
    }
  }
  const buttonChangeYear = (action) => {
    if (action === "<") {
      setCurrentYear(currentYear - 1)
    } else if (action === ">") {
      setCurrentYear(currentYear + 1)
    }
  }

  return (
    <div className={classes.calendar}>
      <Year handler={buttonChangeYear} yearNumber={currentYear} />
      <Month handler={buttonChangeMonth} monthName={currentMonth} />
      <span
        style={{
          gridRow: "3/4",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "1.5rem",
        }}
      >
        Monday
      </span>
      <span
        style={{
          gridRow: "3/4",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "1.5rem",
        }}
      >
        Tuesday
      </span>
      <span
        style={{
          gridRow: "3/4",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "1.5rem",
        }}
      >
        Wednesday
      </span>
      <span
        style={{
          gridRow: "3/4",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "1.5rem",
        }}
      >
        Thursday
      </span>
      <span
        style={{
          gridRow: "3/4",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "1.5rem",
        }}
      >
        Friday
      </span>
      <span
        style={{
          gridRow: "3/4",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "1.5rem",
        }}
      >
        Saturday
      </span>
      <span
        style={{
          gridRow: "3/4",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "1.5rem",
        }}
      >
        Sunday
      </span>

      <DayWrapper />
    </div>
  )
}

export default Calendar
