import React from "react";
import classes from "./DayDataItems.module.css";

const DayDataItems = ({ localDayData }) => {
  return (
    <div className={classes.data}>
      <div className={classes.stats}>
        <span>{localDayData.day}</span>
        <span>{localDayData.que}</span>
      </div>
    </div>
  );
};

export default DayDataItems;
