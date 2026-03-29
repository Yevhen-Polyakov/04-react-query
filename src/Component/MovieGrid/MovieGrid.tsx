import type { Movie } from '../../types/movie'
import css from './MovieGrid.module.css'

interface MoviesGridProps{
    onSelect:(value:Movie) => void,
    items: Movie[]
}

const MovieGrid = ({onSelect, items }: MoviesGridProps) => {
    return(
        <ul className={css.grid}>
            {items.map((movie) => (
                <li key={movie.id}
                    >
                    <div className={css.card}>
                        <img
                            onClick={() => onSelect(movie)}
	                        className={css.image}
		                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
		                    alt={movie.title}
		                    loading="lazy"
		                />
	                    <h2 className={css.title}>{movie.title}</h2>
                    </div>
                </li>
            ))}
            
        </ul>

    )
}

export default MovieGrid