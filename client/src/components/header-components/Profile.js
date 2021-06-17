import classes from "./Profile.module.css"

import React, { useContext, useState, useEffect } from "react"

import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"

import Logo from "./Logo"
import autoClassHelper from "../../utils/autoClass-Helper"

import authContext from "../store/authContext"

/* const beautifyText = (text) => {
  const output = String(text).charAt(0).toUpperCase() + String(text).slice(1)
  return output
} */

const Profile = ({ toggle }) => {
  const [profileState, setProfileState] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    oldpassword: "",
    password: "",
    confirmpassword: "",
    id: "",
    token: "",
  })
  const {
    error,
    id,
    name,
    surname,
    email,
    phone,
    token,
    userLogout,
    userUpdate,
    clearAuthErrors,
  } = useContext(authContext)

  useEffect(() => {
    setProfileState({
      ...profileState,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      id: id,
      token: token,
    })
  }, [])
  useEffect(() => {
    clearAuthErrors()
  }, [profileState])

  const updateUserInfoHandler = async () => {
    const success = await userUpdate({ ...profileState })
    success && toggle()
  }

  const updateHandler = (info) => {
    setProfileState({
      ...profileState,
      ...info,
    })
  }

  const setUserInfoHandler = () => {
    userLogout()
    toggle()
  }
  const userUpdateErrorHandler = (inputParam) => {
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

  return (
    <Modal toggle={toggle}>
      <Logo>
        <h1>LOGO</h1>
        <i className='far fa-calendar-alt'></i>
      </Logo>
      <form className={classes.profile}>
        <Input
          type='text'
          nameTag='Name'
          state='name'
          placeholder={
            typeof error === "object"
              ? userUpdateErrorHandler("name").msg
              : "Name"
          }
          value={profileState.name}
          disabled={false}
          handler={updateHandler}
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "name",
              defaultClass: "primary",
            }).class
          }
        />
        <Input
          type='text'
          nameTag='Last Name'
          state='surname'
          placeholder={
            typeof error === "object"
              ? userUpdateErrorHandler("surname").msg
              : "Last Name"
          }
          value={profileState.surname}
          disabled={false}
          handler={updateHandler}
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "surname",
              defaultClass: "primary",
            }).class
          }
        />
        <Input
          type='email'
          nameTag='Email'
          state='email'
          placeholder='Email'
          value={String(email).toLowerCase()}
          disabled={true}
          classInputType={"primary"}
        />
        <Input
          type='phone'
          nameTag='Phone Number'
          state='phone'
          placeholder={
            typeof error === "object"
              ? userUpdateErrorHandler("phone").msg
              : "Phone"
          }
          value={profileState.phone}
          disabled={false}
          handler={updateHandler}
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "phone",
              defaultClass: "primary",
            }).class
          }
        />
        <Input
          type='password'
          nameTag='Old Password'
          state='oldpassword'
          placeholder={
            typeof error === "object"
              ? userUpdateErrorHandler("oldpassword").msg
              : "Old Password"
          }
          value={profileState.oldpassword}
          disabled={false}
          handler={updateHandler}
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "oldpassword",
              defaultClass: "primary",
            }).class
          }
        />
        <Input
          type='password'
          nameTag='New Password'
          state='password'
          placeholder={
            typeof error === "object"
              ? userUpdateErrorHandler("password").msg
              : "New Password"
          }
          value={profileState.password}
          disabled={false}
          handler={updateHandler}
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "password",
              defaultClass: "primary",
            }).class
          }
        />
        <Input
          type='password'
          nameTag='Confirm New Password'
          state='confirmpassword'
          placeholder={
            typeof error === "object"
              ? userUpdateErrorHandler("confirmpassword").msg
              : "Confirm Password"
          }
          value={profileState.confirmpassword}
          disabled={false}
          handler={updateHandler}
          classInputType={
            autoClassHelper({
              componentType: "input",
              error: error,
              type: "confirmpassword",
              defaultClass: "primary",
            }).class
          }
        />
      </form>
      <nav>
        <Button onClick={updateUserInfoHandler}>Save</Button>
        <Button onClick={toggle}>Cancel</Button>
        <Button onClick={setUserInfoHandler}>Log Out</Button>
      </nav>
    </Modal>
  )
}

export default Profile
