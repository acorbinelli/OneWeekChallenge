import "./App.css"
import React, { useState } from "react"
import { AuthContext } from "./components/store/AuthContext"

import Header from "./components/layout/Header"

function App() {
  //to be replaced by JWT logic
  const [userInfo, setUserInfo] = useState({
    isloggedin: true,
    email: "johndoe@oneweekchallenge.com",
  })
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      <Header />
    </AuthContext.Provider>
  )
}

export default App
