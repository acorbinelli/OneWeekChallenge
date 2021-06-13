import "./App.css"
import React from "react"

import AuthState from "./components/store/AuthState"

import Header from "./components/layout/Header"
import Main from "./components/layout/Main"

function App() {
  return (
    <AuthState>
      <Header />
      <Main />
    </AuthState>
  )
}

export default App
