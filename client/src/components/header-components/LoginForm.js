import classes from "./LoginForm.module.css"
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"

//context

import authContext from "../store/authContext"

//UI components
import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"
import Logo from "./Logo"

//import { AuthContext } from "../store/authContext"

const LoginForm = ({ toggle }) => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" })

  const AuthContext = useContext(authContext)

  const setLoginInfoHandler = (info) => {
    setLoginInfo({ ...loginInfo, ...info })
  }

  useEffect(() => {
    AuthContext.isAuthenticated && toggle()
  }, [AuthContext, toggle])

  //check auth
  const checkLoginInfoHandler = () => {
    AuthContext.loginUser(loginInfo)
  }

  return (
    <Modal toggle={toggle}>
      <Logo>
        <h1>LOGO</h1>
        <i className='far fa-calendar-alt'></i>
      </Logo>
      <form className={classes["login-form"]}>
        <Input
          type='email'
          value={loginInfo.email}
          placeholder='email'
          classType='primary'
          disabled={false}
          handler={setLoginInfoHandler}
        />
        <Input
          type='password'
          placeholder='password'
          value={loginInfo.password}
          classType='primary'
          disabled={false}
          handler={setLoginInfoHandler}
          onEnter={() => {
            checkLoginInfoHandler()
          }}
        />
      </form>
      <nav>
        <Button onClick={checkLoginInfoHandler}>Login</Button>
        <Button onClick={toggle}>Cancel</Button>
      </nav>
    </Modal>
  )
}

export default LoginForm
