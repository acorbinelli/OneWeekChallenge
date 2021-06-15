import classes from "./Profile.module.css"

import React, { useContext } from "react"

import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"

import Logo from "./Logo"

import authContext from "../store/authContext"

//import { AuthContext } from "../store/authContext"

const Profile = ({ toggle }) => {
  const { name, surname, email, phone, userLogout } = useContext(authContext)

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
          value={name}
          disabled={false}
        />
        <Input
          type='text'
          state='surname'
          placeholder='Last Name'
          value={surname}
          disabled={false}
        />
        <Input
          type='email'
          state='email'
          placeholder='Email'
          value={email}
          disabled={true}
        />
        <Input
          type='phone'
          state='phone'
          placeholder='Phone'
          value={phone}
          disabled={false}
        />
        <Input
          type='password'
          state='password'
          placeholder='Password'
          value='Old Password'
          disabled={false}
        />
        <Input
          type='password'
          state='newpassword'
          placeholder='New Password'
          value='New Password'
          disabled={false}
        />
        <Input
          type='password'
          state='passwordconfirm'
          placeholder='Confirm Password'
          value='Confirm Password'
          disabled={false}
        />
      </form>
      <nav>
        <Button onClick={toggle}>Save</Button>
        <Button onClick={toggle}>Cancel</Button>
        <Button onClick={setUserInfoHandler}>Log Out</Button>
      </nav>
    </Modal>
  )
}

export default Profile
