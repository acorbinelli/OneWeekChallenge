import classes from "./Profile.module.css"

import React, { useContext } from "react"

import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"

import Logo from "./Logo"

import authContext from "../store/authContext"

//import { AuthContext } from "../store/authContext"

const Profile = ({ toggle }) => {
  const { name, surname, email, phone } = useContext(authContext)

  const setUserInfoHandler = () => {
    toggle()
  }

  return (
    <Modal toggle={toggle}>
      <Logo>
        <h1>LOGO</h1>
        <i className='far fa-calendar-alt'></i>
      </Logo>
      <form className={classes.profile}>
        <Input type='text' value={name} disabled={false} />
        <Input type='text' value={surname} disabled={false} />
        <Input type='email' value={email} disabled={true} />
        <Input type='phone' value={phone} disabled={false} />
        <Input type='password' value='Old Password' disabled={false} />
        <Input type='password' value='New Password' disabled={false} />
        <Input type='password' value='Confirm Password' disabled={false} />
      </form>
      <nav>
        <Button onClick={toggle}>Edit</Button>
        <Button onClick={toggle}>Cancel</Button>
        <Button onClick={setUserInfoHandler}>Log Out</Button>
      </nav>
    </Modal>
  )
}

export default Profile
