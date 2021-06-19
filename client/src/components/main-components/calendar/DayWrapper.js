import React, { useContext, Fragment, useEffect, useState } from "react"
import AuthContext from "../../store/authContext"
import CalendarContext from "../../store/calendarContext"

import Day from "./Day"

const DayWrapper = () => {
  const { token } = useContext(AuthContext)
  const { days, getDayHandler, getDayHandlerCleanup } =
    useContext(CalendarContext)
  const [localDays, setLocalDays] = useState()

  useEffect(() => {
    setLocalDays(days)

    return () => {
      setLocalDays()
    }
  }, [days])
  const populateCalendar = () => {
    return localDays.map((d) => (
      <Day
        dayID={d}
        key={d}
        handler={getDayHandler}
        cleanup={getDayHandlerCleanup}
        token={token}
      />
    ))
  }
  return <Fragment>{localDays && populateCalendar()}</Fragment>
}

export default DayWrapper
