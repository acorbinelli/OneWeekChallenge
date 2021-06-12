import React from "react"
import classes from "./Button.module.css"

const Button = (props) => {
  const primaryClass = classes.button
  const secondaryClass = classes["button-secondary"]

  const selectClass = (classType) => {
    switch (classType) {
      case "primary":
        return primaryClass
      case "secondary":
        return secondaryClass
      default:
        return primaryClass
    }
  }
  return (
    <button className={selectClass(props.classType)} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
