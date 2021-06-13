import React from "react"
import classes from "./Hero.module.css"

const Hero = (props) => {
  const primaryClass = classes.primary
  const secondaryClass = classes.secondary

  const selectClass = (isloggedin) => {
    return isloggedin ? primaryClass : secondaryClass
  }

  return <div className={selectClass(props.isloggedin)}>{props.children}</div>
}

export default Hero
