import React, { useContext, useEffect, useState } from "react"
import authContext from "../store/authContext"
import { Link, useParams } from "react-router-dom"
import Button from "../UI/Button"
import axios from "axios"

const MainAccountConfirmed = () => {
  const [confirmState, setConfirmState] = useState({ msg: "" })

  const { token } = useParams()
  const { email, getUserCookies } = useContext(authContext)
  useEffect(() => {
    getUserCookies()
    sendToken(token)
  }, [])

  const sendToken = async (token) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/confirmaccount/${token}`
      )

      setConfirmState({ ...confirmState, msg: res.data.msg })
    } catch (err) {
      setConfirmState({ ...confirmState, msg: err.response.data.msg })
    }
  }

  return (
    <div>
      <h1>{confirmState.msg}</h1>
      <Link to='/'>
        <Button classType='primary'>Go back to page</Button>
      </Link>
    </div>
  )
}

export default MainAccountConfirmed
