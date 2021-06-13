import React, { Fragment, useState, useContext } from "react"
//context
import { AuthContext } from "../store/AuthContext"
//components
import Navbar from "../header-components/Navbar"
import Logo from "../header-components/Logo"
import Auth from "../header-components/Auth"
import Button from "../UI/Button"

import LoginForm from "../header-components/LoginForm"
import SignupForm from "../header-components/SignupForm"
import Profile from "../header-components/Profile"

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

  const showLoginForm = () => {
    headerState.loginform
      ? setHeaderState({ ...headerState, loginform: false })
      : setHeaderState({ ...headerState, loginform: true })
  }

  const showSignupForm = () => {
    headerState.signupform
      ? setHeaderState({ ...headerState, signupform: false })
      : setHeaderState({ ...headerState, signupform: true })
  }

  const showProfileForm = () => {
    headerState.profile
      ? setHeaderState({ ...headerState, profile: false })
      : setHeaderState({ ...headerState, profile: true })
  }

  return (
    <Fragment>
      {headerState.loginform && (
        <LoginForm
          toggle={showLoginForm}
          header={{ headerState, setHeaderState }}
        />
      )}

      {headerState.signupform && (
        <SignupForm
          toggle={showSignupForm}
          header={{ headerState, setHeaderState }}
        />
      )}

      {headerState.profile && (
        <Profile
          toggle={showProfileForm}
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
              <Button onClick={showProfileForm} classType='secondary'>
                <i className='fas fa-user-circle'></i>
              </Button>
              <h1 onClick={showProfileForm}>{userInfo.email}</h1>
            </Fragment>
          ) : (
            <Fragment>
              <Button classType='primary' onClick={showLoginForm}>
                Log In
              </Button>
              <Button classType='primary' onClick={showSignupForm}>
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
