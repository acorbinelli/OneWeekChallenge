import React, { Fragment, useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import classes from "./Bookings.module.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Button from "../../UI/Button";

const Bookings = ({
  localDayData,
  setShowBookingsHandler,
  showBookings,
  token,
  getDayData,
}) => {
  const [update, setUpdate] = useState(false);

  const sendDayData = async (e) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/day/${localDayData._id}`,
        { add: false, remove: true, booking: e },
        config
      );
      getDayData();
      return res;
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  return (
    <Fragment>
      {showBookings && (
        <Modal toggle={setShowBookingsHandler}>
          <div className={classes.bookings}>
            {localDayData.bookings &&
              localDayData.bookings.map((e) => (
                <span key={uuidv4()} className={classes.email}>
                  <h1>{e}</h1>
                  <Button
                    onClick={() => {
                      sendDayData(e);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </span>
              ))}
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default Bookings;
