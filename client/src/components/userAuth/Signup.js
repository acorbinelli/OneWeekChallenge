import React, { Fragment, useState } from "react"
import Button from "../UI/Button"
import Modal from "../UI/Modal"

const Signup = ({ showNav, hideNavHandler, showNavHandler }) => {
  const showSignUpOptionsHandler = () => {
    showNavHandler()
  }
  const hideSignUpOptionsHandler = () => {
    hideNavHandler()
  }

  return (
    <Fragment>
      {!showNav && (
        <Button
          type='submit'
          text='Sign Up'
          classType='NavButton'
          action={showSignUpOptionsHandler}
        />
      )}
      {showNav && <Modal action={hideSignUpOptionsHandler}>Sign Up</Modal>}
    </Fragment>
  )
}

export default Signup
