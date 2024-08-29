import React, { useState, useEffect, useRef } from 'react';
import './movies.css';

function MovieDisplay() {
  const [movies, setMovies] = useState([]);
  const movieListRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => {
        // Duplicamos las películas varias veces para crear un loop inicial
        let initialMovies = [];
        for (let i = 0; i < 5; i++) {
          initialMovies = [...initialMovies, ...data];
        }
        setMovies(initialMovies);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  useEffect(() => {
    const movieList = movieListRef.current;

    const cloneMoviesIfNeeded = () => {
      // Si el usuario está cerca del final de la lista, duplicamos las películas nuevamente
      if (movieList.scrollLeft + movieList.clientWidth >= movieList.scrollWidth - 100) {
        setMovies(prevMovies => [...prevMovies, ...prevMovies.slice(0, prevMovies.length / 5)]);
      }
    };

    movieList.addEventListener('scroll', cloneMoviesIfNeeded);

    return () => movieList.removeEventListener('scroll', cloneMoviesIfNeeded);
  }, [movies]);

  return (
    <div className="movieContainer">
      <header>
        <h1>Now playing</h1>
      </header>
      <ul className="movie-list" ref={movieListRef}>
        {movies.map((movie, index) => (
          <li key={index} className="movie-item">
            <div className="movie-image">
              <img src={movie.image} alt={movie.title} />
              <h2>{movie.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDisplay;
