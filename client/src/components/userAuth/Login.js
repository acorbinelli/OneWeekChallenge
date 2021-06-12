import React, { Fragment, useState } from "react"
import Modal from "../UI/Modal"
import Button from "../UI/Button"

const Login = ({ showNav, hideNavHandler, showNavHandler }) => {
  const showLoginOptionsHandler = () => {
    showNavHandler()
  }
  const hideLoginOptionsHandler = () => {
    hideNavHandler()
  }

  return (
    <Fragment>
      {!showNav && (
        <Button
          type='submit'
          text='Log In'
          classType='NavButton'
          action={showLoginOptionsHandler}
        />
      )}
      {showNav && <Modal action={hideLoginOptionsHandler}>Log in</Modal>}
    </Fragment>
  )
}

export default Login
