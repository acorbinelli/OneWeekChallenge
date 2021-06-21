import "./App.css";
import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import AuthState from "./components/store/AuthState";
import CalendarState from "./components/store/CalendarState";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import ConfirmEmail from "./components/layout/ConfirmEmail";

function App() {
  return (
    <Router>
      <AuthState>
        <Header />
        <Switch>
          <CalendarState>
            <Route path="/" exact component={Main} />
            <Route path="/confirmaccount/:token" component={ConfirmEmail} />
          </CalendarState>
        </Switch>
      </AuthState>
    </Router>
  );
}

export default App;
