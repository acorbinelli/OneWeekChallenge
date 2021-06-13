import classes from "./SignupForm.module.css"
import React, { useContext } from "react"
import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"

import Logo from "./Logo"

//import { AuthContext } from "../store/authContext"

const SignupForm = ({ toggle, header }) => {
  // const { userInfo, setUserInfo } = useContext(AuthContext)

  const setUserSignupHandler = () => {
    // setUserInfo({ ...userInfo, isloggedin: true })
    toggle()
  }
  return (
    <Modal toggle={toggle}>
      <Logo>
        <h1>LOGO</h1>
        <i className='far fa-calendar-alt'></i>
      </Logo>
      <form className={classes["signup-form"]}>
        <Input type='text' placeholder='Name' />
        <Input type='text' placeholder='Surname' />
        <Input type='email' placeholder='Email' />
        <Input type='phone' placeholder='Phone Number' />
        <Input type='password' placeholder='Password' />
        <Input type='password' placeholder='Confirm Password' />
      </form>
      <nav>
        <Button onClick={setUserSignupHandler}>Sign Up</Button>
        <Button onClick={toggle}>Cancel</Button>
      </nav>
    </Modal>
  )
}

export default SignupForm
