import classes from "./Input.module.css"

import React from "react"

//class selection
const primaryClass = classes.input
const secondaryClass = classes["input-secondary"]
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

const Input = ({
  type,
  value,
  placeholder,
  classType,
  disabled,
  handler,
  onEnter,
}) => {
  const updateHandler = (event) => {
    handler({ [type]: event.target.value })
  }

  const keyPressHandler = (e) => {
    switch (type) {
      case "password":
        return e.key === "Enter" ? onEnter() : ""
      default:
        return ""
    }
  }

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={updateHandler}
      disabled={disabled ? "disabled" : ""}
      className={selectClass(classType)}
      onKeyPress={keyPressHandler}
    ></input>
  )
}

export default Input
