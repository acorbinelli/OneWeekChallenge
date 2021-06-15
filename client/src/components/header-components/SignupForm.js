import classes from "./SignupForm.module.css"
import React, { useState } from "react"
import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"

import Logo from "./Logo"

const SignupForm = ({ toggle }) => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  })

  const setSignupInfoHandler = (info) => {
    setSignupInfo({ ...signupInfo, ...info })
  }
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
        <Input
          type='name'
          placeholder='Name'
          classType='primary'
          handler={setSignupInfoHandler}
          value={signupInfo.name}
        />
        <Input
          type='surname'
          placeholder='Surname'
          handler={setSignupInfoHandler}
          value={signupInfo.surname}
        />
        <Input
          type='email'
          placeholder='Email'
          handler={setSignupInfoHandler}
          value={signupInfo.email}
        />
        <Input
          type='phone'
          placeholder='Phone Number'
          handler={setSignupInfoHandler}
          value={signupInfo.phone}
        />
        <Input
          type='password'
          placeholder='Password'
          handler={setSignupInfoHandler}
          value={signupInfo.password}
        />
        <Input
          type='confirmpassword'
          placeholder='Confirm Password'
          handler={setSignupInfoHandler}
          value={signupInfo.confirmpassword}
        />
      </form>
      <nav>
        <Button onClick={setUserSignupHandler}>Sign Up</Button>
        <Button onClick={toggle}>Cancel</Button>
      </nav>
    </Modal>
  )
}

export default SignupForm
