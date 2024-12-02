class ApiService {
  private headerGet: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmJlNDcwZDA4NmIyMzhjMmRmZDdjY2JmNjk4MzI4ZSIsIm5iZiI6MTczMjAwNjc1NS45OTksInN1YiI6IjY3M2M1MzYzZjA2MzRjZWEzODJiNjE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-iZtjhUor7luUlOEep_V_ZmAZwOPtqDZSvwbWu6Rs7M',
    },
  };

  // fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err));

  getResource = async (page: number, searchText: string) => {
    let newSearchText = searchText;

    if (searchText === '') {
      newSearchText = 'return';
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${newSearchText}&page=${page}&include_adult=false&language=en-US`,
      this.headerGet,
    );

    if (!response.ok && response.status === 400) {
      throw new Error('Таких фильмов не найдено');
    } else if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  };

  createGuestSession = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/authentication/guest_session/new',
      this.headerGet,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  };

  static rateMovie = async (guestId: string, movieId: number, rate: number) => {
    console.log(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestId}`,
      rate,
    );

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestId}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmJlNDcwZDA4NmIyMzhjMmRmZDdjY2JmNjk4MzI4ZSIsIm5iZiI6MTczMjAwNjc1NS45OTksInN1YiI6IjY3M2M1MzYzZjA2MzRjZWEzODJiNjE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-iZtjhUor7luUlOEep_V_ZmAZwOPtqDZSvwbWu6Rs7M',
        },
        body: `{"value": ${rate}}`,
      },
    );

    console.log(response);

    const data = await response.json();

    return data;
  };
}

export default ApiService;
