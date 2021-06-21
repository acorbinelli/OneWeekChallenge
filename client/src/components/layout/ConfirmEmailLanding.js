import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../store/authContext";

const ConfirmEmailLanding = () => {
  // set auth context confirmed email
  const { getUserProfileData } = useContext(AuthContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getUserProfileData();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div>
      <h1 style={{ color: "white" }}>Please confirm your email</h1>
    </div>
  );
};

export default ConfirmEmailLanding;
