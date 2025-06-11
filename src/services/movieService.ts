import axios from "axios";
import { type Movie } from "../types/movie";

interface Movies {
  results: Movie[];
  total_pages: number;
}

export default async function fetchMovies(query: string, currentPage: number) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`;

  const options = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIxNjNhMGJmODcwNTM0ZjdjMWRlMzg0ZDlmZDYxZCIsIm5iZiI6MTc0OTQ5MDY2Mi4xMjk5OTk5LCJzdWIiOiI2ODQ3MWJlNjdmM2RlZjZmODEzMDFiZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Pr0Cq4JlvRJfVOvsYJo6-CafmnjINgvR3m7t7A9w2-o`,
    },
  };

  const res = await axios.get<Movies>(url, options);

  return res.data;
}
