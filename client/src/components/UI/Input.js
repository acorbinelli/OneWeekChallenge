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
    if (handler) {
      handler({ [state]: event.target.value.trim() })
    }
  }
  const onKeyDownHandler = (event) => {
    if (event.key === "Enter" && onKeyDown) {
      onKeyDown()
    }
  }
  return (
    <Fragment>
      <label className={classes.label} htmlFor={state}>
        {nameTag}
      </label>
      <div className={classes.wrapper}>
        <input
          type={type}
          id={state}
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
        {classInputType === "error" && (
          <div className={classes.test}>
            <span className={classes["span-error"]}>!</span>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default Input
