import React, { useContext, Fragment, useEffect, useState } from "react";
import AuthContext from "../../store/authContext";
import CalendarContext from "../../store/calendarContext";

import Day from "./Day";

const DayWrapper = () => {
  const { token, email } = useContext(AuthContext);
  const { days } = useContext(CalendarContext);
  const [jsxDays, setJsxDays] = useState();

  useEffect(() => {
    if (days && token) {
      const jsxData = days.map((d) => (
        <Day dayID={d} key={d} token={token} email={email}></Day>
      ));

      setJsxDays(jsxData);
    }
    //eslint-disable-next-line
  }, [days]);

  return <Fragment>{jsxDays}</Fragment>;
};

export default DayWrapper;
