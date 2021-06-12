import { createContext } from "react"

export const AuthContext = createContext({
  isloggedin: true,
  setloggedin: (value) => {},
})
