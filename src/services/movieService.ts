import axios from "axios";
import { type Movie } from "../types/movie";

interface Movies {
  results: Movie[];
  total_pages: number;
}

export default async function fetchMovies(query: string, currentPage: number) {
  const myKey = import.meta.env.VITE_API_KEY;

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`;

  const options = {
    headers: { Authorization: `Bearer ${myKey}` },
  };

  const res = await axios.get<Movies>(url, options);

  return res.data;
}
