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
    <div className="movie-detailsFather">
        <div className="headerDetailsContainer">
            <i class='bx bx-left-arrow-alt'></i>
            <header className="headerDetails">Cinema Selection</header>
            <i class='bx bx-dots-vertical-rounded'></i>
        </div>
        <div className="imgContainerDetails">
            <img src={movie.image} alt={movie.title} />
        </div>
    <div className="titleGenre">
        <h2>{movie.title}</h2>
        <p><strong>Genre:</strong> {movie.genre}</p>
    </div>    
            <p>{movie.description}</p>
        <div className="cast">
            {movie.actors}
        </div> 
    </div>
);
}

export default MovieDetails;
