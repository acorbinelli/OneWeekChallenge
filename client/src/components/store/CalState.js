import React, { useReducer, useContext } from "react"
import CalContext from "./calContext"
import CalReducer from "./calReducer"
import axios from "axios"
import authContext from "./authContext"
import {
  GET_MONTH,
  GET_MONTH_FAIL,
  BOOK_DAY,
  BOOK_DAY_FAIL,
  BOOK_CANCEL,
  BOOK_CANCEL_FAIL,
} from "../types"

const CalState = (props) => {
  const initialState = { emailconfirmed: false, month: {} }

  const { token } = useContext(authContext)

  const [state, dispatch] = useReducer(CalReducer, initialState)

  const getMonthHandler = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      }

      const res = axios.get(
        "http://localhost:5000/api/user/emailconfirmed",
        config
      )
      dispatch({ type: GET_MONTH, payload: res.data })
    } catch (err) {
      dispatch({
        type: GET_MONTH_FAIL,
        payload: err.respons.data.msg,
      })
    }
  }
  return (
    <CalContext.Provider
      value={{
        emailconfirmed: state.emailconfirmed,
        month: state.month,
        getMonthHandler,
      }}
    >
      {props.children}
    </CalContext.Provider>
  )
}

export default CalState
