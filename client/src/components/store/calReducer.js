import {
  CHECK_EMAIL_CONFIRMED,
  CHECK_EMAIL_CONFIRMED_FAIL,
  GET_MONTH,
  GET_MONTH_FAIL,
  BOOK_DAY,
  BOOK_DAY_FAIL,
  BOOK_CANCEL,
  BOOK_CANCEL_FAIL,
} from "../types"

const calReducer = (state, action) => {
  switch (action.type) {
    case CHECK_EMAIL_CONFIRMED:
      return
    case CHECK_EMAIL_CONFIRMED_FAIL:
      return
    case GET_MONTH:
      return
    case GET_MONTH_FAIL:
      return
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
