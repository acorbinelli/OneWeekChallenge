import classes from "./Input.module.css"

import React, { Fragment } from "react"

//class selection
const primaryInputClass = classes.input
const secondaryInputClass = classes["input-secondary"]
const errorInputClass = classes["input-error"]

const selectInputClass = (classInputType) => {
  switch (classInputType) {
    case "primary":
      return primaryInputClass
    case "secondary":
      return secondaryInputClass
    case "error":
      return errorInputClass
    default:
      return primaryInputClass
  }
}

const Input = ({
  nameTag,
  type,
  value,
  state,
  placeholder,
  classInputType,
  disabled,
  handler,
  reference,
  onKeyDown,
}) => {
  const updateHandler = (event) => {
    handler({ [state]: event.target.value.trim() })
  }
  /* const beautifyText = (text) => {
    if (text) {
      let words = text.split(" ")

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
      }

      words = words.join(" ")

      return words
    }
  } */
  const onKeyDownHandler = (event) => {
    if (event.key === "Enter" && onKeyDown) {
      onKeyDown()
    }
  }
  return (
    <Fragment>
      <span className={classes.span}>{nameTag}</span>
      <input
        type={type}
        ref={reference}
        value={value}
        placeholder={placeholder}
        onChange={updateHandler}
        disabled={disabled ? "disabled" : ""}
        className={selectInputClass(classInputType)}
        onKeyDown={(e) => {
          onKeyDownHandler(e)
        }}
      />
    </Fragment>
  )
}

export default Input
