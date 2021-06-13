import Cookies from "universal-cookie"

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_ERROR,
  USER_LOAD,
} from "../types"
const cookies = new Cookies()
const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOAD:
      const userToken = cookies.get("ONEWEEKCHALLENGEAPP_TOKEN")
      console.log(userToken)
      return {
        ...state,
      }
    case LOGIN_SUCCESS:
      cookies.set("ONEWEEKCHALLENGEAPP_TOKEN", action.payload.token, {
        path: "/",
        maxAge: 360,
      })
      cookies.set("ONEWEEKCHALLENGEAPP_ID", action.payload.id, {
        path: "/",
        maxAge: 360,
      })

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        id: action.payload.id,
      }
    case LOGIN_FAIL:
      return { ...state, isAuthenticated: false }
    default:
      return {}
  }
}
export default authReducer
