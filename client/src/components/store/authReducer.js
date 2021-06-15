import Cookies from "universal-cookie"

import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  GET_USER_COOKIES,
  GET_USER_PROFILE_DATA,
  GET_USER_PROFILE_DATA_FAIL,
  USER_SIGNUP,
  CLEAR_AUTH_ERRORS,
} from "../types"

const authReducer = (state, action) => {
  const cookies = new Cookies()
  switch (action.type) {
    //check for token and id + store in context
    case GET_USER_COOKIES:
      console.log("getting jwt")
      const token = cookies.get("jwt")
      const id = cookies.get("id")

      if (token) {
        return { ...state, token: token, isAuthenticated: true, id: id }
      }
      return { ...state }
    //store token and id
    case USER_LOGIN:
      console.log("Logged in")

      cookies.set("jwt", action.payload.token, {
        path: "/",
        maxAge: 360,
      })
      cookies.set("id", action.payload.id, {
        path: "/",
        maxAge: 360,
      })
      console.log("Stored cookies")
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        isAuthenticated: true,
        error: "",
      }
    case USER_LOGIN_FAIL:
      console.log("Error logging in")
      return {
        ...state,
        token: "",
        error: action.payload,
        isAuthenticated: false,
      }

    //get current user object data
    case GET_USER_PROFILE_DATA:
      return {
        ...state,

        email: action.payload.email,
        name: action.payload.name,
        surname: action.payload.surname,
        phone: action.payload.phone,
        error: "",
      }
    case GET_USER_PROFILE_DATA_FAIL:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        surname: action.payload.surname,
        phone: action.payload.phone,
        error: action.payload,
      }

    //clean state and delete cookies
    case USER_LOGOUT:
      cookies.remove("jwt")
      cookies.remove("id")
      return {
        ...state,
        id: "",
        isAuthenticated: false,
        email: "",
        name: "",
        surname: "",
        phone: "",
        error: "",
        token: "",
      }

    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: "",
      }
    /* case USER_LOAD:
      console.log("checking cookies")
      const userToken = cookies.get("ONEWEEKCHALLENGEAPP_TOKEN")
      const userID = cookies.get("ONEWEEKCHALLENGEAPP_ID")
      const isAuthenticated = userToken ? true : false

      return {
        ...state,
        isAuthenticated: isAuthenticated,
        token: userToken,
        id: userID,
      }

    case GET_USER:
      console.log("getting user data")
      cookies.set("ONEWEEKCHALLENGEAPP_userData", action.payload, {
        path: "/",
        maxAge: 360,
      })
      return { ...state, ...action.payload }
    case LOGIN_SUCCESS:
      console.log("logging in")
      cookies.set("ONEWEEKCHALLENGEAPP_TOKEN", action.payload.token, {
        path: "/",
        maxAge: 360,
      })
      cookies.set("ONEWEEKCHALLENGEAPP_ID", action.payload.id, {
        path: "/",
        maxAge: 360,
      })

      loginUser(action.payload)

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        id: action.payload.id,
      }
    case LOGIN_FAIL:
      return { ...state, isAuthenticated: false } */
    default:
      return {}
  }
}
export default authReducer
