import css from "./App.module.css";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState, useEffect } from "react";
import { type Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const open = (movie: Movie) => {
    setIsOpen(true);
    setSelectedMovie(movie);
  };
  const close = () => {
    setIsOpen(false);
    setSelectedMovie(null);
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const notify = () => toast.error("No movies found for your request.");

  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      notify();
    }
  }, [data, isSuccess]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);

    setCurrentPage(1);
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.results.length > 0 && (
        <MovieGrid onSelect={open} movies={data.results} />
      )}
      {isOpen && <MovieModal onClose={close} movie={selectedMovie} />}
    </div>
  );
}
