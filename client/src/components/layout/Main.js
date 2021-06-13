import React, { useContext, Fragment } from "react"
import Hero from "../main-components/Hero"
import authContext from "../store/authContext"

const Main = () => {
  //  const { userInfo, setUserInfo } = useContext(authContext)

  return (
    <main>
      <Hero>
        {true ? (
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
