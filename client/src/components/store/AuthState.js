import React, { useReducer, useEffect } from "react"
import AuthContext from "./authContext"
import AuthReducer from "./authReducer"
import axios from "axios"
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_ERROR,
  USER_LOAD,
} from "../types"

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    id: "",
    token: "",
    error: [],
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  //check if logged in
  const checkForCredentials = async () => {
    dispatch({ type: USER_LOAD, payload: "" })
  }
  useEffect(() => {
    checkForCredentials()
  }, [])

  //send login request
  const loginUser = async (object) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    }
    let res = {}
    try {
      res = await axios.post("http://localhost:5000/api/auth", object, config)
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        id: state.id,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        loginUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
