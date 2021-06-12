import React from "react"

import classes from "./Navbar.module.css"

const Navbar = (props) => {
  return <nav className={classes.navbar}>{props.children}</nav>
}

export default Navbar
