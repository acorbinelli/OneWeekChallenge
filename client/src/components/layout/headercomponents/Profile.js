import classes from "./Profile.module.css"

import React, { useContext } from "react"

import Modal from "../../UI/Modal"
import Button from "../../UI/Button"
import { AuthContext } from "../../store/AuthContext"

const Profile = ({ handler, header }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext)
  const setUserInfoHandler = () => {
    setUserInfo({ ...userInfo, isloggedin: false })
    header.setHeaderState({ ...header.headerState, profile: false })
  }

  return (
    <Modal handler={handler}>
      <Button onClick={setUserInfoHandler}>Log Out</Button>
    </Modal>
  )
}

export default Profile
