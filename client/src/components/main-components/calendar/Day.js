import React, { useEffect, useState, useMemo } from "react"

import classes from "./Day.module.css"
import Button from "../../UI/Button"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const Day = ({ token, dayID }) => {
  const [localDayData, setLocalDayData] = useState([])
  const [responseData, setResponseData] = useState({
    bookings: "",
    response: "",
  })

  useEffect(() => {
    getDayData()

    return () => {
      cancelDayToken.cancel()
    }
  }, [])
  const cancelDayToken = axios.CancelToken.source()
  const getDayData = async () => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
      cancelToken: cancelDayToken.token,
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/day/${dayID}`,
        config
      )
      if (res.data) {
        setLocalDayData({
          ...res.data.dayData,
          admin: res.data.admin,
          que: res.data.que,
        })
      }
    } catch (err) {
      console.log(err.response.data.msg)
    }
  }
  const sendDayData = async (data) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
      cancelToken: cancelDayToken.token,
    }

    try {
      const payload = (booking) => {
        if (responseData.response === "add") {
          return { add: false, remove: true, booking: "" }
        } else if (responseData.response === "remove") {
          return { add: true, remove: false, booking: "" }
        } else {
          console.log("adding")
          return { add: true, remove: false, booking: "" }
        }
      }
      const res = await axios.put(
        `http://localhost:5000/api/day/${localDayData._id}`,
        payload(),
        config
      )

      setResponseData({ ...responseData, response: res.data.msg })
      getDayData()

      return res
    } catch (err) {
      console.log(err.response.data.msg)
      getDayData()
      setResponseData({ ...responseData, response: err.response.data.msg })
    }
  }

  const getDayName = (dayDate) => {
    let dayName = new Date(dayDate)
    dayName = dayName.getDay()

    return dayName
  }

  return useMemo(() => {
    return (
      <div
        className={classes.day}
        style={{
          gridColumn: `${
            getDayName(
              localDayData.day + localDayData.monthname + localDayData.year
            ) + 1
          }`,
        }}
      >
        <div className={classes.data}>
          <div className={classes.stats}>
            <span>{localDayData.day}</span>
            <span>{localDayData.que}</span>
          </div>
          <div className={classes.modal}>
            <div className={classes.bookings}>
              {localDayData.bookings &&
                localDayData.bookings.map((e) => (
                  <button key={uuidv4()}>{e}</button>
                ))}
            </div>
          </div>
        </div>

        <div className={classes.controls}>
          <Button
            onClick={() => {
              sendDayData(responseData)
            }}
            classType={"third"}
          >
            <span>
              <i className='fas fa-user-check' />
            </span>
          </Button>
          {localDayData.admin && (
            <Button classType='forth'>
              <span>
                <i className='fas fa-cog' />
              </span>
            </Button>
          )}
        </div>
      </div>
    )
  }, [localDayData])
}

export default Day
