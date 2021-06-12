import classes from "./SignupForm.module.css"
import React, { useContext } from "react"
import Modal from "../../UI/Modal"
import Button from "../../UI/Button"

import { AuthContext } from "../../store/AuthContext"

const SignupForm = ({ handler, header }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext)

  const setSignupFormHandler = () => {
    setUserInfo({ ...userInfo, isloggedin: true })
    header.setHeaderState({ ...header.headerState, signupform: false })
  }
  return (
    <Modal handler={handler}>
      <Button onClick={setSignupFormHandler}>Sign Up</Button>
    </Modal>
  )
}

export default SignupForm
