import React, { Fragment, useState } from "react"
import Modal from "../UI/Modal"
import Button from "../UI/Button"

const Login = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false)

  const showLoginOptionsHandler = (event) => {
    event.preventDefault()
    console.log("show")
    setShowLoginOptions(true)
  }
  const hideLoginOptionsHandler = (event) => {
    event.preventDefault()
    console.log("hide")
    setShowLoginOptions(false)
  }

  return (
    <Fragment>
      {!showLoginOptions && (
        <Button
          type='submit'
          text='Log In'
          classType='NavButton'
          action={showLoginOptionsHandler}
        />
      )}
      {showLoginOptions && (
        <Modal action={hideLoginOptionsHandler}>Log in</Modal>
      )}
    </Fragment>
  )
}

export default Login
