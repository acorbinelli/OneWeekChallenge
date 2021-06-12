import React, { Fragment, useState, useContext } from "react"
//context
import { AuthContext } from "../store/AuthContext"
//components
import Navbar from "./headercomponents/Navbar"
import Logo from "./headercomponents/Logo"
import Auth from "./headercomponents/Auth"
import Button from "../UI/Button"

import LoginForm from "./headercomponents/LoginForm"
import SignupForm from "./headercomponents/SignupForm"
import Profile from "./headercomponents/Profile"

const Header = () => {
  const [headerState, setHeaderState] = useState({
    loginform: false,
    signupform: false,
    profile: false,
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

  const setProfileHeaderStateHandler = () => {
    headerState.profile
      ? setHeaderState({ ...headerState, profile: false })
      : setHeaderState({ ...headerState, profile: true })
  }

  return (
    <Fragment>
      {headerState.loginform && (
        <LoginForm
          handler={setLoginHeaderStateHandler}
          header={{ headerState, setHeaderState }}
        />
      )}

      {headerState.signupform && (
        <SignupForm
          handler={setSignupHeaderStateHandler}
          header={{ headerState, setHeaderState }}
        />
      )}

      {headerState.profile && (
        <Profile
          handler={setProfileHeaderStateHandler}
          header={{ headerState, setHeaderState }}
        />
      )}

      <Navbar>
        <Logo>
          <h1>LOGO</h1>
          <i className='far fa-calendar-alt'></i>
        </Logo>
        <Auth>
          {userInfo.isloggedin ? (
            <Fragment>
              <Button
                onClick={setProfileHeaderStateHandler}
                classType='secondary'
              >
                <i className='fas fa-user-circle'></i>
              </Button>
              <h1 onClick={setProfileHeaderStateHandler}>{userInfo.email}</h1>
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
