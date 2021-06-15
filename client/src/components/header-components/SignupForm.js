import classes from "./SignupForm.module.css"
import React, { useState, useContext, useEffect, useRef } from "react"
import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"
import Logo from "./Logo"

import authContext from "../store/authContext"

const SignupForm = ({ toggle }) => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  })
  const { userSignup, isAuthenticated, clearAuthErrors, error } =
    useContext(authContext)

  const nameInput = useRef()
  const surnameInput = useRef()
  const emailInput = useRef()
  const phoneInput = useRef()
  const passwordInput = useRef()
  const confirmpasswordInput = useRef()

  useEffect(() => {
    if (isAuthenticated) {
      toggle()
      clearAuthErrors()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (error) {
      switch (error[0].param) {
        case "name":
          nameInput.current.focus()
          return
        case "surname":
          surnameInput.current.focus()
          return
        case "email":
          emailInput.current.focus()
          return
        case "phone":
          phoneInput.current.focus()
          return
        case "password":
          passwordInput.current.focus()
          return
        case "confirmpassword":
          confirmpasswordInput.current.focus()
          return
        default:
          return
      }
    }
  }, [error])

  useEffect(() => {
    clearAuthErrors()
  }, [signupInfo])

  const setSignupInfoHandler = (info) => {
    setSignupInfo({ ...signupInfo, ...info })
  }
  const setUserSignupHandler = () => {
    userSignup(signupInfo)
    !signupInfo && toggle()
    isAuthenticated && toggle()
  }

  //BUG: fix this signluphandler
  const userSignupErrorHandler = (inputParam) => {
    let message = ""
    let errorClass = ""
    error.map((err) => {
      if (err.param === inputParam) {
        message = err.msg
        errorClass = "error"
      }
      return ""
    })

    return { msg: message, classType: errorClass }
  }
  return (
    <Modal toggle={toggle}>
      <Logo>
        <h1>LOGO</h1>
        <i className='far fa-calendar-alt'></i>
      </Logo>
      <form className={classes["signup-form"]}>
        <Input
          type='text'
          state='name'
          reference={nameInput}
          placeholder={error ? userSignupErrorHandler("name").msg : "Name"}
          classInputType={
            error ? userSignupErrorHandler("name").classType : "primary"
          }
          handler={setSignupInfoHandler}
          classSpanType={
            error ? userSignupErrorHandler("name").classType : "primary"
          }
          value={signupInfo.name}
        />
        <Input
          type='text'
          state='surname'
          reference={surnameInput}
          placeholder={
            error ? userSignupErrorHandler("surname").msg : "Last Name"
          }
          classInputType={
            error ? userSignupErrorHandler("surname").classType : "primary"
          }
          handler={setSignupInfoHandler}
          classSpanType={
            error ? userSignupErrorHandler("surname").classType : "primary"
          }
          value={signupInfo.surname}
        />
        <Input
          type='email'
          state='email'
          reference={emailInput}
          placeholder={error ? userSignupErrorHandler("email").msg : "Email"}
          classInputType={
            error ? userSignupErrorHandler("email").classType : "primary"
          }
          handler={setSignupInfoHandler}
          classSpanType={
            error ? userSignupErrorHandler("email").classType : "primary"
          }
          value={signupInfo.email}
        />
        <Input
          type='phone'
          state='phone'
          reference={phoneInput}
          placeholder={
            error ? userSignupErrorHandler("phone").msg : "Phone Number"
          }
          classInputType={
            error ? userSignupErrorHandler("phone").classType : "primary"
          }
          handler={setSignupInfoHandler}
          classSpanType={
            error ? userSignupErrorHandler("phone").classType : "primary"
          }
          value={signupInfo.phone}
        />
        <Input
          type='password'
          state='password'
          reference={passwordInput}
          placeholder={
            error ? userSignupErrorHandler("password").msg : "Password"
          }
          classInputType={
            error ? userSignupErrorHandler("password").classType : "primary"
          }
          handler={setSignupInfoHandler}
          classSpanType={
            error ? userSignupErrorHandler("password").classType : "primary"
          }
          value={signupInfo.password}
        />
        <Input
          type='password'
          state='confirmpassword'
          reference={confirmpasswordInput}
          placeholder={
            error
              ? userSignupErrorHandler("confirmpassword").msg
              : "Confirm Password"
          }
          classInputType={
            error
              ? userSignupErrorHandler("confirmpassword").classType
              : "primary"
          }
          handler={setSignupInfoHandler}
          classSpanType={
            error
              ? userSignupErrorHandler("confirmpassword").classType
              : "primary"
          }
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
