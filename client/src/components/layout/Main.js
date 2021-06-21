import React, { useContext, useEffect } from "react";
import Hero from "../main-components/Hero";
import Calendar from "../main-components/calendar/Calendar";
import ConfirmEmailLanding from "./ConfirmEmailLanding";

import authContext from "../store/authContext";
import axios from "axios";

const Main = () => {
  const { isAuthenticated, isConfirmed } = useContext(authContext);

  const userConfirmedHandler = () => {
    if (isConfirmed && isAuthenticated) {
      return <Calendar />;
    } else if (isAuthenticated && !isConfirmed) {
      return <ConfirmEmailLanding />;
    }
  };
  return (
    <main>
      <Hero isAuthenticated={isAuthenticated}>
        {!isAuthenticated && (
          <div>
            <h1>Office today ?</h1>
            <h3>Let us know</h3>
          </div>
        )}
        {userConfirmedHandler()}
      </Hero>
    </main>
  );
};

export default Main;
