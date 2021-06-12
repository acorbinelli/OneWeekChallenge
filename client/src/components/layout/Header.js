import React, { Fragment, useState, useContext } from "react"
//context
import { AuthContext } from "../store/AuthContext"
//components
import Navbar from "./headercomponents/Navbar"
import Logo from "./headercomponents/Logo"
import Auth from "./headercomponents/Auth"
import Button from "../UI/Button"
import Modal from "../UI/Modal"

const Header = () => {
  const [headerState, setHeaderState] = useState({
    loginform: false,
    signupform: false,
  })

  const { userInfo, setUserInfo } = useContext(AuthContext)

  //set logged in state for user
  /*  const setLoggedInUserHandler = () => {
    setUserInfo({ ...userInfo, isloggedin: true })
    console.log(userInfo)
  } */

  const setLoginHeaderStateHandler = () => {
    headerState.loginform
      ? setHeaderState({ ...headerState, loginform: false })
      : setHeaderState({ ...headerState, loginform: true })
  }

  const setSignupHeaderStateHandler = () => {
    headerState.signupform
      ? setHeaderState({ ...headerState, signupform: false })
      : setHeaderState({ ...headerState, signupform: true })
  }

  return (
    <Fragment>
      {headerState.loginform && (
        <Modal close={setLoginHeaderStateHandler}>
          <h1>CACA</h1>
          <h1>CACA</h1>
          <h1>CACA</h1>
          <h1>CACA</h1>
          <h1>CACA</h1>
        </Modal>
      )}

      {headerState.signupform && (
        <Modal close={setSignupHeaderStateHandler}>
          <h1>PIPI</h1>
          <h1>PIPI</h1>
          <h1>PIPI</h1>
          <h1>PIPI</h1>
          <h1>PIPI</h1>
        </Modal>
      )}

      <Navbar>
        <Logo>
          <h1>LOGO</h1>
          <i className='far fa-calendar-alt'></i>
        </Logo>
        <Auth>
          {userInfo.isloggedin ? (
            <Fragment>
              <h1>{userInfo.email}</h1>
              <Button classType='secondary'>
                <i className='fas fa-user-circle'></i>
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button classType='primary' onClick={setLoginHeaderStateHandler}>
                Log In
              </Button>
              <Button classType='primary' onClick={setSignupHeaderStateHandler}>
                Sign Up
              </Button>
            </Fragment>
          )}
        </Auth>
      </Navbar>
      <hr />
    </Fragment>
  )
}

export default Header
