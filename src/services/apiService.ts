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

  getResource = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=s`,
      this.header,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    console.log(data);

    return data;
  };
}

export default ApiService;
