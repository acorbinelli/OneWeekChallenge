import classes from "./LoginForm.module.css"
import React, { useContext } from "react"

import Modal from "../../UI/Modal"

import Button from "../../UI/Button"

import { AuthContext } from "../../store/AuthContext"

const LoginForm = ({ handler, header }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext)

  const setUserInfoHandler = () => {
    setUserInfo({ ...userInfo, isloggedin: true })
    header.setHeaderState({ ...header.headerState, loginform: false })
  }

  return (
    <Modal handler={handler}>
      <Button onClick={setUserInfoHandler}>Login</Button>
    </Modal>
  )
}

export default LoginForm
