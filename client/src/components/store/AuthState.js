import React, { useReducer, useEffect } from "react"
import AuthContext from "./authContext"
import AuthReducer from "./authReducer"
import axios from "axios"
import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  GET_USER_COOKIES,
  GET_USER_PROFILE_DATA,
  GET_USER_PROFILE_DATA_FAIL,
  CLEAR_AUTH_ERRORS,
} from "../types"

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    id: "",
    token: "",
    email: "",
    name: "",
    surname: "",
    phone: "",
    error: "",
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  useEffect(() => {
    getUserCookies()
  }, [])

  //HTTP Requests AXIOS + dispatching to AuthContext

  //SUBJECT: User Login
  const userLogin = async (userInput) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        ...userInput,
      })

      dispatch({ type: USER_LOGIN, payload: res.data })
    } catch (err) {
      dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.msg })
    }
  }

  const getUserProfileData = async () => {
    const config = {
      headers: {
        "x-auth-token": state.token,
      },
    }
    try {
      const res = await axios.get("http://localhost:5000/api/user", config)

      dispatch({ type: GET_USER_PROFILE_DATA, payload: res.data })
    } catch (err) {
      dispatch({
        type: GET_USER_PROFILE_DATA_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  const getUserCookies = async () => {
    try {
      await dispatch({ type: GET_USER_COOKIES, payload: "" })
    } catch (err) {
      console.log(err)
    }
  }

  const userLogout = async () => {
    try {
      await dispatch({ type: USER_LOGOUT, payload: "" })
    } catch (err) {
      console.log(err)
    }
  }

  //SUBJECT: User Signup
  //TODO:
  const userSignup = async (userInput) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        ...userInput,
      })

      dispatch({ type: USER_LOGIN, payload: res.data })
    } catch (err) {
      dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.msg })
    }
  }

  const clearAuthErrors = async () => {
    try {
      await dispatch({ type: CLEAR_AUTH_ERRORS, payload: "" })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        id: state.id,
        isAuthenticated: state.isAuthenticated,
        name: state.name,
        surname: state.surname,
        phone: state.phone,
        token: state.token,
        error: state.error,
        email: state.email,
        userLogin,
        getUserProfileData,
        getUserCookies,
        userLogout,
        clearAuthErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
