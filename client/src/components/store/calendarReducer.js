import { GET_MONTH } from "../types"

const calendarReducer = (state, action) => {
  switch (action.type) {
    case GET_MONTH:
      if (typeof action.payload !== "string") {
        return { ...state, month: action.payload }
      }
      break
    default:
      return { ...state }
  }
}

export default calendarReducer
