import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieData{
    results: Movie[]
}

const myKey = import.meta.env.VITE_TMDB_TOKEN

export async function fetchMovies (query: string):Promise<Movie[]> {
    const response = await axios.get<MovieData>(
        `https://api.themoviedb.org/3/search/movie`,
        {
            params:{
                    query
            },

            headers: {
                Authorization: `Bearer ${myKey}`
            }
        }
    );
    return response.data.results;
}