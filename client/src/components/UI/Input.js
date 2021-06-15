import classes from "./Input.module.css"

import React, { Fragment } from "react"

//class selection
const primaryInputClass = classes.input
const secondaryInputClass = classes["input-secondary"]
const errorInputClass = classes["input-error"]
const primarySpanClass = classes.span
const errorSpanClass = classes["span-error"]

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
const selectSpanClass = (classSpanType) => {
  switch (classSpanType) {
    case "primary":
      return primarySpanClass
    case "error":
      return errorSpanClass
    default:
      return primarySpanClass
  }
}

const Input = ({
  type,
  value,
  state,
  placeholder,
  classInputType,
  classSpanType,
  disabled,
  handler,
  reference,
  error,
}) => {
  const updateHandler = (event) => {
    handler({ [state]: event.target.value })
  }
  const beautifyText = (text) => {
    if (text) {
      let words = text.split(" ")

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
      }

      words = words.join(" ")

      return words
    }
  }

  return (
    <Fragment>
      <span className={selectSpanClass(classSpanType)}>
        {beautifyText(placeholder)}
      </span>
      <input
        type={type}
        ref={reference}
        value={value}
        placeholder={placeholder}
        onChange={updateHandler}
        disabled={disabled ? "disabled" : ""}
        className={selectInputClass(classInputType)}
      />
    </Fragment>
  )
}

export default Input
