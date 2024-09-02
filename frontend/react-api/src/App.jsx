import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Movies from "./components/movies/movies.jsx";
import UserHeader from "./components/userHeader/userHeader.jsx";
import BrowserComponent from "./components/browser/browser.jsx";
import MovieDetails from "./components/moviesDetail/moviesDetails.jsx";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      
      {!location.pathname.startsWith("/movie/") && (
        <>
          <UserHeader />
          <BrowserComponent />
        </>
      )}
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} /> 
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
