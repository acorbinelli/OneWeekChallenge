import React, { useContext, useEffect, useState } from "react"
import authContext from "../store/authContext"
import { Link, useParams } from "react-router-dom"
import Button from "../UI/Button"
import axios from "axios"

const ConfirmEmail = () => {
  const [confirmState, setConfirmState] = useState({ msg: "" })

  const { token } = useParams()
  const { getUserCookies } = useContext(authContext)
  useEffect(() => {
    getUserCookies()
    sendToken(token)
    //eslint-disable-next-line
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <h1>Success</h1>
      <h2>{confirmState.msg}</h2>
      <Link to='/'>
        <Button classType='primary'>Go back to page</Button>
      </Link>
    </div>
  )
}

export default ConfirmEmail
