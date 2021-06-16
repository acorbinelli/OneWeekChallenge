import classes from "./SignupForm.module.css"
import React, { useState, useContext, useEffect, useRef } from "react"
import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"
import Logo from "./Logo"
import autoClassHelper from "../../utils/autoClass-Helper"

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
    if (error && typeof error === "object") {
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
    if (
      error &&
      typeof error === "string" &&
      error === "Email already in use"
    ) {
      const field = emailInput.current
      field.focus()
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

    if (typeof error === "object") {
      error.map((err) => {
        if (err.param === inputParam) {
          message = err.msg
          errorClass = "error"
        }
        return ""
      })
    } else if (typeof error === "string") {
      message = error
    }

    return { msg: message, classType: errorClass }
  }
  //BUG:refactor this
  const setEmailInUseErrorClass = (error) => {
    if (typeof error === "object") {
      return userSignupErrorHandler("email").classType
    } else if (typeof error === "string" && error === "Email already in use") {
      return "error"
    } else {
      return "primary"
    }
  }
  return (
    <Modal toggle={toggle}>
      <Logo>
        <h1>LOGO</h1>
        <i className='far fa-calendar-alt'></i>
      </Logo>
      <form className={classes["signup-form"]}>
        <Input
          nameTag='Name'
          type='text'
          state='name'
          reference={nameInput}
          placeholder={
            typeof error === "object"
              ? userSignupErrorHandler("name").msg
              : "Name"
          }
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              defaultClass: "primary",
              type: "name",
            }).class
          }
          handler={setSignupInfoHandler}
          value={signupInfo.name}
        />
        <Input
          nameTag='Last Name'
          type='text'
          state='surname'
          reference={surnameInput}
          placeholder={
            typeof error === "object"
              ? userSignupErrorHandler("surname").msg
              : "Last Name"
          }
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "surname",
              defaultClass: "primary",
            }).class
          }
          handler={setSignupInfoHandler}
          classSpanType={
            typeof error === "object"
              ? userSignupErrorHandler("surname").classType
              : "primary"
          }
          value={signupInfo.surname}
        />
        <Input
          nameTag='Email'
          type='email'
          state='email'
          reference={emailInput}
          placeholder={
            typeof error === "object"
              ? userSignupErrorHandler("email").msg
              : "Email"
          }
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "email",
              defaultClass: "primary",
            }).class
          }
          handler={setSignupInfoHandler}
          classSpanType={
            typeof error === "object"
              ? userSignupErrorHandler("email").classType
              : "primary"
          }
          value={signupInfo.email}
        />
        <Input
          nameTag='Phone Number'
          type='phone'
          state='phone'
          reference={phoneInput}
          placeholder={
            typeof error === "object"
              ? userSignupErrorHandler("phone").msg
              : "Phone Number"
          }
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "phone",
              defaultClass: "primary",
            }).class
          }
          handler={setSignupInfoHandler}
          classSpanType={
            typeof error === "object"
              ? userSignupErrorHandler("phone").classType
              : "primary"
          }
          value={signupInfo.phone}
        />
        <Input
          nameTag='Password'
          type='password'
          state='password'
          reference={passwordInput}
          placeholder={
            typeof error === "object"
              ? userSignupErrorHandler("password").msg
              : "Password"
          }
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "password",
              defaultClass: "primary",
            }).class
          }
          handler={setSignupInfoHandler}
          classSpanType={
            typeof error === "object"
              ? userSignupErrorHandler("password").classType
              : "primary"
          }
          value={signupInfo.password}
        />
        <Input
          nameTag='Confirm Password'
          type='password'
          state='confirmpassword'
          reference={confirmpasswordInput}
          placeholder={
            typeof error === "object"
              ? userSignupErrorHandler("confirmpassword").msg
              : "Confirm Password"
          }
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "confirmpassword",
              defaultClass: "primary",
            }).class
          }
          handler={setSignupInfoHandler}
          classSpanType={
            typeof error === "object"
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
