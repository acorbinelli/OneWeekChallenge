import React, { useEffect, useState, Fragment } from "react";

import DayControls from "./DayControls";
import DayDataItems from "./DayDataItems";
import Bookings from "./Bookings";

import classes from "./Day.module.css";
import axios from "axios";

const Day = ({ token, dayID }) => {
  const [localDayData, setLocalDayData] = useState({});
  const [showBookings, setShowBookings] = useState(false);

  useEffect(() => {
    getDayData();

    return () => {
      cancelDayToken.cancel();
    };
    //eslint-disable-next-line
  }, []);
  const cancelDayToken = axios.CancelToken.source();

  const getDayData = async () => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
      cancelToken: cancelDayToken.token,
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/api/day/${dayID}`,
        config
      );
      if (res.data) {
        setLocalDayData({
          ...res.data.dayData,
          admin: res.data.admin,
          que: res.data.que,
          present: res.data.present,
        });
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const getDayName = () => {
    const objDate = new Date(
      `${localDayData.day} ${localDayData.monthname} ${localDayData.year}`
    );

    return objDate.getDay() || 0;
  };

  const setShowBookingsHandler = () => {
    if (!showBookings) {
      setShowBookings(true);
    } else {
      setShowBookings(false);
    }
  };

  return (
    <div
      className={classes.day}
      style={{
        gridColumn: getDayName(),
      }}
    >
      {localDayData && (
        <Fragment>
          <DayDataItems localDayData={localDayData} />
          <DayControls
            localDayData={localDayData}
            getDayData={getDayData}
            cancelDayToken={cancelDayToken}
            token={token}
            setShowBookingsHandler={setShowBookingsHandler}
          />
          <Bookings
            localDayData={localDayData}
            setShowBookingsHandler={setShowBookingsHandler}
            showBookings={showBookings}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Day;
