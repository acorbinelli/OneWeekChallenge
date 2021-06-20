import React from "react"
import classes from "./button.module.css"

const Button = (props) => {
  const primaryClass = classes.button
  const secondaryClass = classes["button-secondary"]
  const thirdClass = classes["button-third"]
  const thirdClassDisabled = classes["button-third-disabled"]
  const forthClassDisabled = classes["button-forth"]
  const selectClass = (classType) => {
    switch (classType) {
      case "primary":
        return primaryClass
      case "secondary":
        return secondaryClass
      case "third":
        return thirdClass
      case "disabled":
        return thirdClassDisabled
      case "forth":
        return forthClassDisabled
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
