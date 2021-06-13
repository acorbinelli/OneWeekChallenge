import classes from "./LoginForm.module.css"
import React, { useContext } from "react"

import Modal from "../UI/Modal"

import Button from "../UI/Button"
import Input from "../UI/Input"

import Logo from "./Logo"

import { AuthContext } from "../store/AuthContext"

const LoginForm = ({ toggle, header }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext)

  const setUserInfoHandler = (data) => {
    setUserInfo({ ...userInfo, ...data })
  }

  const setUserLoginHandler = () => {
    //JWT logic set isloggedin
    setUserInfo({ ...userInfo, isloggedin: true })
    toggle()
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
          placeholder='email'
          classType='primary'
          disabled={false}
          handler={setUserInfoHandler}
        />
        <Input
          type='password'
          placeholder='password'
          classType='primary'
          disabled={false}
          handler={setUserInfoHandler}
          onEnter={setUserLoginHandler}
        />
      </form>
      <nav>
        <Button onClick={setUserLoginHandler}>Login</Button>
        <Button onClick={toggle}>Cancel</Button>
      </nav>
    </Modal>
  )
}

export default LoginForm
