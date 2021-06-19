import { CHANGE_MONTH, GET_MONTH, GET_DAY } from "../types"

const calendarReducer = (state, action) => {
  switch (action.type) {
    case GET_MONTH:
      //  console.log(action.payload)
      if (typeof action.payload !== "string") {
        return {
          ...state,
          month: action.payload,
        }
      }
      return { ...state }
    case GET_DAY:
      if (typeof action.payload !== "string") {
        if (state.daysref.length > 0) {
          let newDaysRef = state.daysref.filter(
            (d) => d._id !== action.payload._id
          )
          newDaysRef = [...newDaysRef, { ...action.payload }]
          return { ...state, daysref: newDaysRef }
        } else {
          return {
            ...state,
            daysref: [...state.daysref, { ...action.payload }],
          }
        }
      }

      return { ...state }

    case CHANGE_MONTH:
      return {
        ...state,
        daysref: [],
        name: action.payload.monthName,
        year: action.payload.yearNumber,
      }

    default:
      return { ...state }
  }
}

export default calendarReducer
