import React, { useContext, Fragment } from "react"
import Hero from "../main-components/Hero"
import { AuthContext } from "../store/AuthContext"

const Main = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext)

  return (
    <main>
      <Hero isloggedin={userInfo.isloggedin}>
        {userInfo.isloggedin ? (
          <div>something else</div>
        ) : (
          <div>
            <h1>Office today ?</h1>
            <h3>Let us know</h3>
          </div>
        )}
      </Hero>
    </main>
  )
}

export default Main
