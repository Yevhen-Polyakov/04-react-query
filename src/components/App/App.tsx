import toast, { Toaster } from "react-hot-toast"
import SearchBar from "../SearchBar/SearchBar"
import { useState } from "react"
import type { Movie } from "../../types/movie"
import { fetchMovies } from "../../services/movieService"
import MovieGrid from "../MovieGrid/MovieGrid"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieModal from "../MovieModal/MovieModal"

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

async function handleSearch(query: string) {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(query);
      
      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data);
       
    } catch {
      setIsError(true);
      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch}/>
      {isLoading && (
        <Loader/>
      )}

      {isError && (
        <ErrorMessage/>
      )}

      <MovieGrid onSelect={(movie: Movie) => {setSelectedMovie(movie)}} items={movies}/>
      <Toaster/>
      {selectedMovie && selectedMovie && (
        <MovieModal onClose={() => setSelectedMovie(null)} item={selectedMovie}/>
      )}
      
    </>
  )
}

export default App
