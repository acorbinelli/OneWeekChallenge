import Cookies from "universal-cookie"

import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_SIGNUP_FAIL,
  USER_UPDATE,
  USER_UPDATE_FAIL,
  GET_USER_COOKIES,
  GET_USER_PROFILE_DATA,
  GET_USER_PROFILE_DATA_FAIL,
  CLEAR_AUTH_ERRORS,
} from "../types"

const authReducer = (state, action) => {
  const cookies = new Cookies()
  switch (action.type) {
    //SUBJECT:store token and id in cookies
    case USER_LOGIN:
      cookies.set("jwt", action.payload.token, {
        path: "/",
        maxAge: 360,
      })
      cookies.set("id", action.payload.id, {
        path: "/",
        maxAge: 360,
      })

      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        isAuthenticated: true,
        error: "",
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        token: "",
        error: action.payload,
        isAuthenticated: false,
      }

    //SUBJECT:clean state/cookies and logout user
    case USER_LOGOUT:
      cookies.remove("jwt", { path: "/", domain: "localhost" })
      cookies.remove("id", { path: "/", domain: "localhost" })
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

    //SUBJECT:signup user and store jwt and id in state
    case USER_SIGNUP:
      cookies.set("jwt", action.payload.token, {
        path: "/",
        maxAge: 360,
      })
      cookies.set("id", action.payload.id, {
        path: "/",
        maxAge: 360,
      })
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      }
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        token: "",
        error: action.payload,
        isAuthenticated: false,
      }

    //SUBJECT:check for cookies and store in state
    case GET_USER_COOKIES:
      const token = cookies.get("jwt")
      const id = cookies.get("id")

      if (token) {
        return { ...state, token: token, isAuthenticated: true, id: id }
      }
      return { ...state }

    //SUBJECT:get current user object data and store in state
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
    //SUBJECT: Update user profile data and token
    case USER_UPDATE:
      cookies.remove("jwt", { path: "/", domain: "localhost" })
      cookies.remove("id", { path: "/", domain: "localhost" })
      cookies.set("jwt", action.payload.newToken, {
        path: "/",
        maxAge: 360,
      })
      cookies.set("id", action.payload.id, {
        path: "/",
        maxAge: 360,
      })
      console.log(action.payload.email)
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        surname: action.payload.surname,
        phone: action.payload.phone,
        error: action.payload,
      }
    case USER_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: "",
      }

    default:
      return {}
  }
}
export default authReducer
