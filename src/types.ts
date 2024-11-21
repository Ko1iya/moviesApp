/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
export interface item {
  adult?: boolean | null;
  backdrop_path?: string | null;
  genre_ids?: number[] | null;
  id?: number | null;
  original_language?: string | null;
  original_title?: string | null;
  overview?: string | null;
  popularity?: number | null;
  poster_path?: string | null;
  release_date?: string | null;
  title?: string | null;
  video?: boolean | null;
  vote_average?: number | null;
  vote_count?: number | null;
}
export interface Data {
  page: number;
  results: item[] | null;
  total_pages: number;
  total_results: number;
}
