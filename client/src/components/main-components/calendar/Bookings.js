import React, { Fragment } from "react";
import Modal from "../../UI/Modal";
import classes from "./Bookings.module.css";
import { v4 as uuidv4 } from "uuid";

const Bookings = ({ localDayData, setShowBookingsHandler, showBookings }) => {
  return (
    <Fragment>
      {showBookings && (
        <Modal toggle={setShowBookingsHandler}>
          <div className={classes.bookings}>
            <div>
              {localDayData.bookings &&
                localDayData.bookings.map((e) => (
                  <button key={uuidv4()}>{e}</button>
                ))}
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default Bookings;
