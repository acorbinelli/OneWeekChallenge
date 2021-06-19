import React, { useEffect, useContext, useState } from "react"
import classes from "./Day.module.css"
import Button from "../../UI/Button"
import CalendarContext from "../../store/calendarContext"
import c from "config"

const Day = ({ dayID, token, handler, cleanup }) => {
  const { daysref } = useContext(CalendarContext)
  const [dayData, setDayData] = useState({})
  useEffect(() => {
    handler(dayID, token)
    return () => {
      cleanup()
    }
    //eslint-disable-next-line
  }, [dayID])

  useEffect(() => {
    setDayData(daysref.find((d) => d._id === dayID))
    return () => {
      setDayData()
    }
    //eslint-disable-next-line
  }, [daysref])

  return (
    <div className={classes.day}>
      <div className={classes.data}>
        <span>{dayData && dayData.day}</span>
      </div>

      <div className={classes.controls}>
        <Button classType='third-disabled'>
          <span>{"Coming"}</span>
        </Button>
        <Button classType='third'>
          <span>{"Book day!"}</span>
        </Button>
      </div>
    </div>
  )
}

export default Day
