import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import SearchBar from "../SearchBar/SearchBar"
import { useEffect, useState } from "react"
import type { Movie } from "../../types/movie"
import { fetchMovies } from "../../services/movieService"
import type { MovieData } from "../../services/movieService"
import MovieGrid from "../MovieGrid/MovieGrid"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieModal from "../MovieModal/MovieModal"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Pagination from "../ReactPaginate/ReactPaginate"

function App() {
  const [movies, setMovies] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1)

  const {data, isLoading, isError, isSuccess} = useQuery<MovieData>({
    queryKey: ["query", movies, page],
    queryFn: () => fetchMovies(movies, page),
    enabled: movies !== "",
    placeholderData: keepPreviousData,
  })

  const totalPages = data?.total_pages ?? 0 

  function handleSearch (newMovies: string){
    setMovies(newMovies)
    setPage(1)
  }

  useEffect(() => {
    if (isSuccess && data && data.results.length === 0) {
      toast("Фільми не знайдено.", { icon: "🔍" });
    }
  }, [isSuccess, data]);

  return (
    <>
      <SearchBar onSubmit={handleSearch}/>

      {isSuccess && totalPages > 1 && (
        <Pagination 
          totalPages={totalPages} 
          page={page} 
          setPage={setPage} />
      )}
      
      {isLoading && (
        <Loader/>
      )}

      {isError && (
        <ErrorMessage/>
      )}

      {data && <MovieGrid onSelect={(movie: Movie) => {setSelectedMovie(movie)}} movies={data.results}/>}
      
      <Toaster/>
      {selectedMovie && selectedMovie && (
        <MovieModal onClose={() => setSelectedMovie(null)} movie={selectedMovie}/>
      )}
      
    </>
  )
}

export default App
