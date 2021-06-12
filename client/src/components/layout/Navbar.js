import React, { Fragment, useState } from "react"
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"

import classes from "./Navbar.module.css"

import Login from "../userAuth/Login"
import Signup from "../userAuth/Signup"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showNav, setShowNav] = useState(true)

  const isLoggedInHandler = () => {
    setIsLoggedIn(true)
  }
  const isLoggedOutHandler = () => {
    setIsLoggedIn(false)
  }

  const showNavHandler = () => {
    setShowNav(true)
  }

  const hideNavHandler = () => {
    setShowNav(false)
  }

  return (
    <Router>
      <Fragment>
        <div className={classes.container}>
          <div className={classes.logo}>
            <i className='far fa-calendar-alt' />
            <h1>OneWeekChallengeApp</h1>
          </div>
          <nav className={classes.nav}>
            {!isLoggedIn && (
              <Fragment>
                <Login
                  showNav={showNav}
                  hideNavHandler={hideNavHandler}
                  showNavHandler={showNavHandler}
                />
                <Signup
                  showNav={showNav}
                  hideNavHandler={hideNavHandler}
                  showNavHandler={showNavHandler}
                />
              </Fragment>
            )}
          </nav>
        </div>
      </Fragment>
    </Router>
  )
}

export default Navbar
