import classes from "./Input.module.css"

import React from "react"

const Input = ({ type, placeholder, classType, disabled, value }) => {
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
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled ? "disabled" : ""}
      className={selectClass(classType)}
      onChange={(e) => {
        return e.target.value
      }}
    ></input>
  )
}

export default Input
