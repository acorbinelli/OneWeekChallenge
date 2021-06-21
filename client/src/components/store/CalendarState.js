import React, { useReducer } from "react";
import axios from "axios";

import CalendarContext from "./calendarContext";
import CalendarReducer from "./calendarReducer";

import { GET_MONTH, CHANGE_MONTH } from "../types";

const CalendarState = (props) => {
  const initialState = {
    name: "January",
    year: 2021,
    daysref: [],
    month: [],
  };

  const [state, dispatch] = useReducer(CalendarReducer, initialState);

  const cancelMonthToken = axios.CancelToken.source();

  const getMonthHandler = async (monthName, yearNumber, token) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
      cancelToken: cancelMonthToken.token,
    };
    try {
      // console.log(`requesting for ${monthName}/${yearNumber}`)
      const res = await axios.get(
        `https://oneweekchallengeapp.herokuapp.com/api/month/${monthName}&${yearNumber}`,
        config
      );
      //console.log(res.data)

      if (res.data) {
        dispatch({ type: GET_MONTH, payload: res.data });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getMonthHandlerCleanup = () => {
    cancelMonthToken.cancel(`Cancel Month Request`);
  };

  const changeMonthHandler = (monthName, yearNumber) => {
    // console.log(`CHANGEMONTHHANDLED: ${monthName}`)

    dispatch({
      type: CHANGE_MONTH,
      payload: { monthName, yearNumber },
    });
  };

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
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

export default CalendarState;
