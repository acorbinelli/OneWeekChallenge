import "./App.css"
import React, { useState } from "react"
import { AuthContext } from "./components/store/AuthContext"

import Header from "./components/layout/Header"
import Main from "./components/layout/Main"

function App() {
  //to be replaced by JWT logic
  const [userInfo, setUserInfo] = useState({
    isloggedin: false,
    email: "johndoe@oneweekchallenge.com",
    name: "John",
    surname: "Doe",
    phone: "0040730220439",
  })
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      <Header />
      <Main />
    </AuthContext.Provider>
  )
}

export default App
