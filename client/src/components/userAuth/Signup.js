import React, { Fragment, useState } from "react"
import Button from "../UI/Button"
import Modal from "../UI/Modal"

const Signup = () => {
  const [showSignUpOptions, setShowSignUpOptions] = useState(false)

  const showSignUpOptionsHandler = (event) => {
    event.preventDefault()
    console.log("showing")
    setShowSignUpOptions(true)
  }
  const hideSignUpOptionsHandler = (event) => {
    event.preventDefault()
    console.log("hiding")
    setShowSignUpOptions(false)
  }

  return (
    <Fragment>
      {!showSignUpOptions && (
        <Button
          type='submit'
          text='Sign Up'
          classType='NavButton'
          action={showSignUpOptionsHandler}
        />
      )}
      {showSignUpOptions && (
        <Modal action={hideSignUpOptionsHandler}>Sign Up</Modal>
      )}
    </Fragment>
  )
}

export default Signup
