import React from "react"
import classes from "./Hero.module.css"

const Hero = (props) => {
  const primaryClass = classes.primary
  const secondaryClass = classes.secondary

  const selectClass = (isAuthenticated) => {
    return isAuthenticated ? primaryClass : secondaryClass
  }

  return (
    <div className={selectClass(props.isAuthenticated)}>{props.children}</div>
  )
}

export default Hero
