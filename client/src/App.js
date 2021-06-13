import "./App.css"
import React, { useState, useEffect } from "react"
import { AuthContext } from "./components/store/AuthContext"

import Header from "./components/layout/Header"
import Main from "./components/layout/Main"

function App() {
  //to be replaced by JWT logic
  const [userInfo, setUserInfo] = useState({
    isloggedin: false,
    email: "",
    name: "",
    surname: "",
    phone: "",
    password: "",
    id: "",
  })

  const { isloggedin } = userInfo
  //clean userInfo state
  useEffect(() => {
    !isloggedin
      ? setUserInfo({
          ...userInfo,
          email: "",
          name: "",
          surname: "",
          phone: "",
          password: "",
          id: "",
        })
      : setUserInfo({
          ...userInfo,
          password: "",
        })
    //BUG
    // eslint-disable-next-line
  }, [isloggedin])

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      <Header />
      <Main />
    </AuthContext.Provider>
  )
}

export default App
