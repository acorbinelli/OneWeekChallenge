import React, { Fragment } from "react";
import classes from "./Weekdays.css";

const Weekdays = () => {
  return (
    <Fragment>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "3/4",
          textAlign: "center",
        }}
      >
        Monday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "3/4",
          textAlign: "center",
        }}
      >
        Tuesday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "3/4",
          textAlign: "center",
        }}
      >
        Wednesday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "3/4",
          textAlign: "center",
        }}
      >
        Thursday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "3/4",
          textAlign: "center",
        }}
      >
        Friday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "3/4",
          textAlign: "center",
        }}
      >
        Saturday
      </span>
      <span
        className={classes.weekdays}
        style={{
          gridRow: "3/4",
          textAlign: "center",
        }}
      >
        Sunday
      </span>
    </Fragment>
  );
};

export default Weekdays;
