import React, { Fragment, useState, useContext, useEffect } from "react"

import Navbar from "../header-components/Navbar"
import Logo from "../header-components/Logo"
import Auth from "../header-components/Auth"
import Button from "../UI/Button"

import LoginForm from "../header-components/LoginForm"
import SignupForm from "../header-components/SignupForm"
import Profile from "../header-components/Profile"

import authContext from "../store/authContext"

const Header = () => {
  const [headerState, setHeaderState] = useState({
    loginform: false,
    signupform: false,
    profile: false,
    email: "",
  })

  const { isAuthenticated, getUserProfileData, email, clearAuthErrors } =
    useContext(authContext)

  useEffect(() => {
    isAuthenticated && getUserProfileData()
    //eslint-disable-next-line
  }, [isAuthenticated])

  const showLoginForm = () => {
    clearAuthErrors()
    headerState.loginform
      ? setHeaderState({ ...headerState, loginform: false })
      : setHeaderState({ ...headerState, loginform: true })
  }

  const showSignupForm = () => {
    clearAuthErrors()
    headerState.signupform
      ? setHeaderState({ ...headerState, signupform: false })
      : setHeaderState({ ...headerState, signupform: true })
  }

  const showProfileForm = () => {
    clearAuthErrors()
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
          {isAuthenticated ? (
            <Fragment>
              <Button onClick={showProfileForm} classType='secondary'>
                <i className='fas fa-user-circle'></i>
              </Button>
              <h1 onClick={showProfileForm}>{email}</h1>
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
