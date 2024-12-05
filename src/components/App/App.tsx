import type { PaginationProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import Header from '../Header/Header';
import ListMovies from '../ListMovies/ListMovies';
import Pagination from '../Pagination/Pagination';
import styles from './App.module.scss';
import ApiService from '@/services/apiService';

interface IAppContext {
  genres: { [key: number]: string };
}

export const AppContext = React.createContext<IAppContext>({
  genres: {},
});

function App() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isRated, setIsRated] = useState(false);
  const [genres, setGenres] = useState<{ [key: number]: string }>([]);

  const apiService = new ApiService();

  useEffect(() => {
    apiService.getGenres().then((res) => {
      const genresSorted: { [key: number]: string } = {};
      res.genres.forEach(({ name, id }: { name: string; id: number }) => {
        genresSorted[id] = name;
      });
      setGenres(genresSorted);
    });
  }, []);

  const changePage = () => {
    setPage(1);
  };

  const toggleIsRated = () => {
    setIsRated((pre) => !pre);
  };

  const searchFunc = (text: string) => {
    setPage(1);
    setSearchText(text);
  };

  const onChange: PaginationProps['onChange'] = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.App}>
      <AppContext.Provider value={useMemo(() => ({ genres }), [genres])}>
        <Header
          isRated={isRated}
          toggleIsRated={toggleIsRated}
          searchFunc={searchFunc}
          changePage={changePage}
        />
        <ListMovies isRated={isRated} page={page} searchText={searchText} />
        <Pagination page={page} onChange={onChange} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
