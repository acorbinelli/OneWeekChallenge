import React, { useReducer } from "react"
import axios from "axios"
import CalendarContext from "./calendarContext"
import CalendarReducer from "./calendarReducer"

import { GET_MONTH } from "../types"

const CalendarState = (props) => {
  const initialState = {
    name: "",
    year: "",
    daysref: [],
  }
  const [state, dispatch] = useReducer(CalendarReducer, initialState)

  const getMonthHandler = async (monthName, yearNumber, token) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/month/${monthName}&${yearNumber}`
      )
      dispatch({ type: GET_MONTH, payload: res.data })
    } catch (err) {
      throw err.response.data.msg
    }
  }

  return (
    <CalendarContext.Provider
      value={{
        name: state.name,
        year: state.year,
        daysref: state.daysref,
        getMonthHandler,
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  )
}

export default CalendarState
