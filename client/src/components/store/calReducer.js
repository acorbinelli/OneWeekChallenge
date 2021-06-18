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

const calReducer = (state, action) => {
  switch (action.type) {
    case CHECK_EMAIL_CONFIRMED:
      return { ...state, emailconfirmed: action.payload }
    case CHECK_EMAIL_CONFIRMED_FAIL:
      return { ...state, emailconfirmed: action.payload }
    case GET_MONTH:
      return { ...state, month: action.payload }
    case GET_MONTH_FAIL:
      return { ...state, month: action.payload }

    case GET_DAY:
      let newDaysData = []

      if (state.month.days.length > 0) {
        newDaysData = state.dayData.filter((day) => {
          return day !== action.payload._id
        })
        newDaysData.push(action.payload)
      } else {
        newDaysData.push(action.payload)
      }

      return {
        ...state,
        dayData: newDaysData,
      }

    case GET_DAY_FAIL:
      return { ...state }
    case BOOK_DAY:
      return
    case BOOK_DAY_FAIL:
      return
    case BOOK_CANCEL:
      return
    case BOOK_CANCEL_FAIL:
      return
    default:
      return false
  }
}

export default calReducer
