import classes from "./Profile.module.css"

import React, { useContext } from "react"

import Modal from "../UI/Modal"
import Button from "../UI/Button"
import Input from "../UI/Input"

import Logo from "./Logo"

import { AuthContext } from "../store/AuthContext"

const Profile = ({ toggle, header }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext)
  const setUserInfoHandler = () => {
    setUserInfo({ ...userInfo, isloggedin: false })
    header.setHeaderState({ ...header.headerState, profile: false })
  }

  return (
    <Modal toggle={toggle}>
      <Logo>
        <h1>LOGO</h1>
        <i className='far fa-calendar-alt'></i>
      </Logo>
      <form className={classes.profile}>
        <Input type='text' value={userInfo.name} disabled={false}></Input>

        <Input type='text' value={userInfo.surname} disabled={false} />
        <Input type='email' value={userInfo.email} disabled={true} />
        <Input type='phone' value={userInfo.phone} disabled={false} />
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
