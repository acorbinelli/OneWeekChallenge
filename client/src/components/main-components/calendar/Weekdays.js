import React, { Fragment } from "react";
import classes from "./Weekdays.css";

const Weekdays = () => {
  return (
    <Fragment>
      <span
        style={{
          gridRow: "2/3",
          textAlign: "center",
          color: "white",
        }}
        className={classes.weekdays}
      >
        Monday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "2/3",
          textAlign: "center",
          color: "white",
        }}
      >
        Tuesday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "2/3",
          textAlign: "center",
          color: "white",
        }}
      >
        Wednesday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "2/3",
          textAlign: "center",
          color: "white",
        }}
      >
        Thursday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "2/3",
          textAlign: "center",
          color: "white",
        }}
      >
        Friday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "2/3",
          textAlign: "center",
          color: "rgb(182, 255, 47)",
        }}
      >
        Saturday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "2/3",
          textAlign: "center",
          color: "rgb(182, 255, 47)",
        }}
      >
        Sunday
      </span>
    </Fragment>
  );
};

export default Weekdays;
