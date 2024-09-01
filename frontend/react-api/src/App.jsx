import React, { useState, useEffect } from "react";
import Movies from "./components/movies/movies.jsx";
import UserHeader from "./components/userHeader/userHeader.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <UserHeader />
      <Movies />
    </div>
  );
}

export default App;
