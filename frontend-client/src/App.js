import React from "react";
import { Home, MainPage } from "./screens";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

const Routing = () => {

  return (
    <>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/app" exact>
        <MainPage />
      </Route>
    </>
  );
};

function App() {
  return (
    <div className="app">
      <Router>
        <Routing />
      </Router>
    </div>
  );
}

export default App;
