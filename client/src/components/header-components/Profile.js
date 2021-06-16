import classes from "./Profile.module.css"

import React, { useContext, useState, useEffect } from "react"

import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"

import Logo from "./Logo"

import authContext from "../store/authContext"

const beautifyText = (text) => {
  const output = String(text).charAt(0).toUpperCase() + String(text).slice(1)
  return output
}

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
  const { id, name, surname, email, phone, token, userLogout, userUpdate } =
    useContext(authContext)

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

  const updateUserInfoHandler = () => {
    userUpdate({ ...profileState })

    toggle()
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

  return (
    <Modal toggle={toggle}>
      <Logo>
        <h1>LOGO</h1>
        <i className='far fa-calendar-alt'></i>
      </Logo>
      <form className={classes.profile}>
        <Input
          type='text'
          state='name'
          placeholder='Name'
          value={profileState.name}
          disabled={false}
          handler={updateHandler}
        />
        <Input
          type='text'
          state='surname'
          placeholder='Last Name'
          value={profileState.surname}
          disabled={false}
          handler={updateHandler}
        />
        <Input
          type='email'
          state='email'
          placeholder='Email'
          value={String(email).toLowerCase()}
          disabled={true}
        />
        <Input
          type='phone'
          state='phone'
          placeholder='Phone'
          value={profileState.phone}
          disabled={false}
          handler={updateHandler}
        />
        <Input
          type='password'
          state='oldpassword'
          placeholder='Password'
          value={profileState.oldpassword}
          disabled={false}
          handler={updateHandler}
        />
        <Input
          type='password'
          state='password'
          placeholder='New Password'
          value={profileState.password}
          disabled={false}
          handler={updateHandler}
        />
        <Input
          type='password'
          state='confirmpassword'
          placeholder='Confirm Password'
          value={profileState.confirmpassword}
          disabled={false}
          handler={updateHandler}
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
