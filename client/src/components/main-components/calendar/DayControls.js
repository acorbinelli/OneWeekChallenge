import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/authContext";
import classes from "./DayControls.module.css";
import axios from "axios";
import Button from "../../UI/Button";
import authContext from "../../store/authContext";

const DayControls = ({
  localDayData,
  token,
  getDayData,
  cancelDayToken,
  setShowBookingsHandler,
}) => {
  const { email } = useContext(authContext);
  const [responseData, setResponseData] = useState({
    add: false,
    remove: false,
    isfull: false,
  });

  useEffect(() => {
    if (Object.keys(localDayData).length > 0) {
      setResponseDataHandler();
    }
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

  return (
    <div className={classes.controls}>
      <Button
        onClick={() => {
          sendDayData(responseData);
        }}
        classType={"third"}
      >
        <span>
          <i className="fas fa-user-check" />
        </span>
      </Button>
      {localDayData.admin && (
        <Button onClick={setShowBookingsHandler} classType="forth">
          <span>
            <i className="fas fa-cog" />
          </span>
        </Button>
      )}
    </div>
  );
};

export default DayControls;
