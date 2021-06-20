import React from "react";
import Button from "../../UI/Button";
import classes from "./Year.module.css";

const Year = (props) => {
  return (
    <div className={classes.year}>
      <Button
        classType="secondary"
        onClick={() => {
          props.handler("<");
        }}
      >
        <span>{"<"}</span>
      </Button>
      <h1 className={classes.yearnumber}>{props.yearNumber}</h1>
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

export default Year;
