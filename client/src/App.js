import "./App.css"
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import AuthState from "./components/store/AuthState"
import CalState from "./components/store/CalState"

import Header from "./components/layout/Header"
import Main from "./components/layout/Main"
import ConfirmEmail from "./components/layout/ConfirmEmail"

function App() {
  return (
    <Router>
      <AuthState>
        <Header />
        <Switch>
          <CalState>
            <Route path='/' exact component={Main} />
          </CalState>
          <Route path='/confirmaccount/:token' component={ConfirmEmail} />
        </Switch>
      </AuthState>
    </Router>
  )
}

export default App
