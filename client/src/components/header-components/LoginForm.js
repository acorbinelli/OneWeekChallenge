import classes from "./LoginForm.module.css"
import React, { useContext, useState, useEffect } from "react"
//context
import authContext from "../store/authContext"
//UI components
import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"
import Logo from "./Logo"

const LoginForm = ({ toggle }) => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" })

  const { userLogin, isAuthenticated, error, clearAuthErrors } =
    useContext(authContext)

  useEffect(() => {
    if (isAuthenticated) {
      toggle()
      clearAuthErrors()
    }
    //eslint-disable-next-line
  }, [isAuthenticated])

  const setLoginInfoHandler = (info) => {
    setLoginInfo({ ...loginInfo, ...info })
  }

  const userLoginHandler = () => {
    userLogin(loginInfo)
  }

  const userLoginErrorHandler = () => {
    if (error) {
      if (error[0].param === "email") {
        return <h1 className={classes.error}>{error[0].msg}</h1>
      } else if (error[0].param === "password") {
        return <h1 className={classes.error}>{error[0].msg}</h1>
      } else {
        return <h1 className={classes.error}>{error}</h1>
      }
    }
  }

  return (
    <Modal toggle={toggle}>
      <Logo>
        <h1>LOGO</h1>
        <i className='far fa-calendar-alt'></i>
      </Logo>
      {userLoginErrorHandler()}
      <form className={classes["login-form"]}>
        <Input
          type='email'
          state='email'
          value={loginInfo.email}
          placeholder='Email'
          classType='primary'
          disabled={false}
          handler={setLoginInfoHandler}
          onKeyDown={userLoginHandler}
        />
        <Input
          type='password'
          state='password'
          placeholder='Password'
          value={loginInfo.password}
          classType='primary'
          disabled={false}
          handler={setLoginInfoHandler}
          onKeyDown={userLoginHandler}
        />
      </form>
      <nav>
        <Button onClick={userLoginHandler}>Login</Button>
        <Button onClick={toggle}>Cancel</Button>
      </nav>
    </Modal>
  )
}

export default LoginForm
