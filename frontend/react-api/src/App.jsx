import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./components/movies/movies.jsx";
import UserHeader from "./components/userHeader/userHeader.jsx";
import BrowserComponent from "./components/browser/browser.jsx";
import MovieDetails from "./components/moviesDetail/moviesDetails.jsx"; // Nuevo componente para los detalles
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <UserHeader />
        <BrowserComponent />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} /> {/* Ruta para detalles */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
