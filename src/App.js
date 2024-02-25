import logo from "./logo.svg";
import React from "react";
import "./App.css";
import dummyData from "./constants/DummyData";
import Shorts from "./component/Shorts";

function App() {
  return (
    <div className="container">
      <Shorts />
    </div>
  );
}

export default App;
