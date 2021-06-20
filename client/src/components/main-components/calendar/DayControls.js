import React, { useState, useEffect } from "react";

import classes from "./DayControls.module.css";
import axios from "axios";
import Button from "../../UI/Button";

const DayControls = ({
  localDayData,
  token,
  getDayData,
  cancelDayToken,
  setShowBookingsHandler,
}) => {
  const [responseData, setResponseData] = useState({
    add: false,
    remove: false,
    isfull: false,
  });

  useEffect(() => {
    if (Object.keys(localDayData).length > 0) {
      setResponseDataHandler();
      getButtonClass();
    }
    //eslint-disable-next-line
  }, [localDayData]);

  const setResponseDataHandler = () => {
    //current state

    const currentBookingsNumber = localDayData.que.split("/")[0];
    setResponseData({
      ...responseData,
      isfull: currentBookingsNumber < localDayData.slots,
    });
    if (localDayData.present) {
      setResponseData({ ...responseData, remove: true, add: false });
    } else if (
      !localDayData.present &&
      currentBookingsNumber < localDayData.slots
    ) {
      setResponseData({ ...setResponseData, add: true, remove: false });
    }
  };

  const sendDayData = async () => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
      cancelToken: cancelDayToken.token,
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/day/${localDayData._id}`,
        responseData,
        config
      );

      setResponseData({ ...responseData, response: res.data.msg });
    } catch (err) {
      console.log(err.response.data.msg);

      setResponseData({ ...responseData, response: err.response.data.msg });
    }
    getDayData();
  };

  const getButtonClass = () => {
    //FIX:
    if (localDayData) {
      const objDate = new Date(
        `${localDayData.day} ${localDayData.monthname} ${localDayData.year}`
      );
      const newDate = new Date();

      if (objDate < newDate) {
        return "forth-disabled";
      }
      if (responseData.add && !responseData.isfull) {
        return "forth-add";
      } else if (localDayData.present) {
        return "forth-remove";
      } else if (responseData.isfull && !localDayData.present) {
        return "forth-disabled";
      }
    }
  };

  const checkOld = () => {
    const objDate = new Date(
      `${localDayData.day} ${localDayData.monthname} ${localDayData.year}`
    );
    const newDate = new Date();

    if (objDate < newDate) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={classes.controls}>
      {!checkOld() && (
        <Button
          onClick={() => {
            sendDayData(responseData);
          }}
          classType={getButtonClass()}
          disabled={checkOld ? "disabled" : ""}
        >
          {localDayData.present && (
            <span>
              <i className="fas fa-user-times"></i>
            </span>
          )}
          {!localDayData.present && (
            <span>
              <i className="fas fa-user-check" />
            </span>
          )}
        </Button>
      )}

      {localDayData.admin && (
        <Button onClick={setShowBookingsHandler} classType={"secondary"}>
          <span>
            <i className="fas fa-cog" />
          </span>
        </Button>
      )}
    </div>
  );
};

export default DayControls;
