import classes from "./Button.module.css"

import React from "react"

const Button = ({ text, type, action, classType }) => {
  const NavButtonStyle = classes.NavButton
  const DefaultButtonStyle = classes.DefaultButton
  return (
    <button
      type={type}
      onClick={action}
      className={
        classType === "NavButton" ? NavButtonStyle : DefaultButtonStyle
      }
    >
      {text}
    </button>
  )
}

export default Button
