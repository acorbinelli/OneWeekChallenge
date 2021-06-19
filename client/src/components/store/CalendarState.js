import React, { useReducer } from "react"
import axios from "axios"

import CalendarContext from "./calendarContext"
import CalendarReducer from "./calendarReducer"

import { GET_DAY, GET_MONTH, CHANGE_MONTH } from "../types"

const CalendarState = (props) => {
  const initialState = {
    name: "January",
    year: 2021,
    daysref: [],
    month: [],
  }

  const [state, dispatch] = useReducer(CalendarReducer, initialState)

  const cancelMonthToken = axios.CancelToken.source()
  const cancelDayToken = axios.CancelToken.source()

  const getMonthHandler = async (monthName, yearNumber, token) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
      cancelToken: cancelMonthToken.token,
    }
    try {
      // console.log(`requesting for ${monthName}/${yearNumber}`)
      const res = await axios.get(
        `http://localhost:5000/api/month/${monthName}&${yearNumber}`,
        config
      )
      //console.log(res.data)

      if (res.data) {
        dispatch({ type: GET_MONTH, payload: res.data })
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const getMonthHandlerCleanup = () => {
    cancelMonthToken.cancel(`Cancel Month Request`)
  }

  const changeMonthHandler = (monthName, yearNumber) => {
    // console.log(`CHANGEMONTHHANDLED: ${monthName}`)

    dispatch({
      type: CHANGE_MONTH,
      payload: { monthName, yearNumber },
    })
  }

  const getDayHandler = async (dayID, token) => {
    //  console.log(`getting day for ${dayID} token ${token}`)
    const config = {
      headers: {
        "x-auth-token": token,
      },
      cancelToken: cancelDayToken.token,
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/day/${dayID}`,
        config
      )

      if (res.data) {
        dispatch({ type: GET_DAY, payload: res.data })
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  const getDayHandlerCleanup = () => {
    cancelDayToken.cancel("Cancel Day Request")
  }

  return (
    <CalendarContext.Provider
      value={{
        name: state.name,
        year: state.year,
        daysref: state.daysref,
        month: state.month,
        days: state.month.days,
        getMonthHandler,
        getMonthHandlerCleanup,
        changeMonthHandler,
        getDayHandler,
        getDayHandlerCleanup,
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  )
}

export default CalendarState
