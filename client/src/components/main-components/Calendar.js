import React from "react"
import classes from "./Calendar.module.css"
import Button from "../UI/Button"

const Calendar = () => {
  return (
    <div className={classes.calendar}>
      <Button classType='secondary' style={{ gridColumn: "1", gridRow: "1" }}>
        <span style={{ fontSize: "3rem" }}>{"<"}</span>
      </Button>
      <div
        style={{
          gridArea: "month",
          textAlign: "center",
        }}
      >
        <h1>June</h1>
      </div>
      <Button classType='secondary' style={{ gridColumn: "7", gridRow: "1" }}>
        <span style={{ fontSize: "3rem" }}>{">"}</span>
      </Button>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
      <div style={{ backgroundColor: "yellow" }}></div>
    </div>
  )
}

export default Calendar
