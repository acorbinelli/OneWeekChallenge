import React from "react";

import Button from "../../UI/Button";
import classes from "./Month.module.css";

const Month = (props) => {
  return (
    <div className={classes.month}>
      <Button
        classType="secondary"
        onClick={() => {
          props.handler("<");
        }}
        style={{ gridArea: "button" }}
      >
        <span>{"<"}</span>
      </Button>
      <h1 className={classes.monthscroll}>{props.monthName}</h1>
      <Button
        classType="secondary"
        onClick={() => {
          props.handler(">");
        }}
      >
        <span>{">"}</span>
      </Button>
    </div>
  );
};

export default Month;
