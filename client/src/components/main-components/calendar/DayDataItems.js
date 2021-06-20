import React, { useEffect, useState } from "react";
import classes from "./DayDataItems.module.css";

const DayDataItems = ({ localDayData }) => {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    if (Object.keys(localDayData).length > 0) {
      calculateGradient();
    }
  }, [localDayData]);
  const calculateGradient = () => {
    const booked = localDayData.que.split("/")[0];
    const slots = localDayData.slots;

    const percentage = (100 * booked) / slots;
    setPercentage(percentage);
  };
  return (
    <div
      className={classes.data}
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(228,255,0,1) ${percentage}%, rgba(0,255,7,1) 100%)`,
      }}
    >
      <div className={classes.stats}>
        <span className={classes.day}>{localDayData.day}</span>
        <span className={classes.que}>
          <i className="fas fa-users"></i>
          {localDayData.que}
        </span>
      </div>
    </div>
  );
};

export default DayDataItems;
