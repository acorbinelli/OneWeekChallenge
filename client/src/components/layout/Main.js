import React, { useContext, useEffect } from "react"
import Hero from "../main-components/Hero"
import Calendar from "../main-components/Calendar"
import authContext from "../store/authContext"
import calContext from "../store/calContext"

const Main = () => {
  const { isAuthenticated, token } = useContext(authContext)
  const { checkEmailConfirmedHandler } = useContext(calContext)

  useEffect(() => {
    if (token) {
      checkEmailConfirmedHandler(token)
    }

    //eslint-disable-next-line
  }, [token])
  return (
    <main>
      <Hero isAuthenticated={isAuthenticated}>
        {!isAuthenticated && (
          <div>
            <h1>Office today ?</h1>
            <h3>Let us know</h3>
          </div>
        )}
        {isAuthenticated && <Calendar />}
      </Hero>
    </main>
  )
}

export default Main
