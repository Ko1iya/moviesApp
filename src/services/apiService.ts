class ApiService {
  private header: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmJlNDcwZDA4NmIyMzhjMmRmZDdjY2JmNjk4MzI4ZSIsIm5iZiI6MTczMjAwNzQ3OS4zMjg2ODE1LCJzdWIiOiI2NzNjNTM2M2YwNjM0Y2VhMzgyYjYxNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pJUqV-3xDj_VysrJ7RA6ymall7mN0a_FEoqml0ANYzM',
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
      this.header,
    );

    if (!response.ok && response.status === 400) {
      throw new Error('Таких фильмов не найдено');
    } else if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  };
}

export default ApiService;
