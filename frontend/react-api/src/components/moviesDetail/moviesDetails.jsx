import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './moviesDetails.css';

function MovieDetails() {
const { id } = useParams();
const [movie, setMovie] = useState(null);

useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
    .then(response => response.json())
    .then(data => setMovie(data))
    .catch(error => console.error('Error fetching movie details:', error));
}, [id]);

if (!movie) {
    return <div>Loading...</div>;
}

return (
    <div className="movie-details">
        <h2>{movie.title}</h2>
        <img src={movie.image} alt={movie.title} />
        <p>{movie.description}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Release Date:</strong> {movie.releaseDate}</p>
    </div>
);
}

export default MovieDetails;
