import React, { useReducer } from "react"
import CalContext from "./calContext"
import CalReducer from "./calReducer"
import axios from "axios"

import {
  CHECK_EMAIL_CONFIRMED,
  CHECK_EMAIL_CONFIRMED_FAIL,
  GET_MONTH,
  GET_MONTH_FAIL,
  GET_DAY,
  GET_DAY_FAIL,
  BOOK_DAY,
  BOOK_DAY_FAIL,
  BOOK_CANCEL,
  BOOK_CANCEL_FAIL,
} from "../types"

const CalState = (props) => {
  const initialState = {
    emailconfirmed: false,
    month: { monthname: "", days: [], year: "" },
    dayData: [],
  }

  const [state, dispatch] = useReducer(CalReducer, initialState)

  const checkEmailConfirmedHandler = async (token) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    }

    try {
      const res = await axios.get(
        "http://localhost:5000/api/user/confirmed",
        config
      )

      if (res.data) {
        dispatch({ type: CHECK_EMAIL_CONFIRMED, payload: res.data })
      } else {
        dispatch({ type: CHECK_EMAIL_CONFIRMED_FAIL, payload: res.data })
      }
    } catch (err) {
      console.log("DISPATCHINGGGGG")
      console.log(err)
      dispatch({
        type: CHECK_EMAIL_CONFIRMED_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  const getMonthHandler = async (month, year, token) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/month/${month}&${year}`,
        config
      )

      dispatch({ type: GET_MONTH, payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_MONTH_FAIL, payload: err.response.data.msg })
    }
  }

  const getDayHandler = async (id, token) => {
    console.log(id)
    const config = {
      headers: {
        "x-auth-token": token,
      },
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/day/${id}`, config)

      dispatch({ type: GET_DAY, payload: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <CalContext.Provider
      value={{
        emailconfirmed: state.emailconfirmed,
        month: state.month,
        days: state.month.days,
        dayData: state.dayData,
        checkEmailConfirmedHandler,
        getMonthHandler,
        getDayHandler,
      }}
    >
      {props.children}
    </CalContext.Provider>
  )
}

export default CalState
