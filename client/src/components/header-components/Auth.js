import React from "react"
import classes from "./Auth.module.css"

const Auth = (props) => {
  return <div className={classes.auth}>{props.children}</div>
}

export default Auth
