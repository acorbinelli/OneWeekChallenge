import "./App.css"
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import AuthState from "./components/store/AuthState"
import CalState from "./components/store/CalState"

import Header from "./components/layout/Header"
import Main from "./components/layout/Main"
import MainAccountConfirmed from "./components/layout/MainAccountConfirmed"

function App() {
  return (
    <Router>
      <AuthState>
        <Header />
        <Switch>
          <CalState>
            <Route path='/' exact component={Main} />
          </CalState>
          <Route
            path='/confirmaccount/:token'
            component={MainAccountConfirmed}
          />
        </Switch>
      </AuthState>
    </Router>
  )
}

export default App
