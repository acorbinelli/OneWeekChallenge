import React, { useContext } from "react"
import Hero from "../main-components/Hero"
import Calendar from "../main-components/Calendar"
import authContext from "../store/authContext"

const Main = () => {
  const { isAuthenticated } = useContext(authContext)
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
