import type { PaginationProps } from 'antd';
import { useState } from 'react';

import Header from '../Header/Header';
import ListMovies from '../ListMovies/ListMovies';
import Pagination from '../Pagination/Pagination';
import styles from './App.module.scss';

function App() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const searchFunc = (text: string) => {
    setSearchText(text);
  };

  const onChange: PaginationProps['onChange'] = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.App}>
      <Header searchFunc={searchFunc} />
      <ListMovies page={page} searchText={searchText} />
      <Pagination page={page} onChange={onChange} />
    </div>
  );
}

export default App;
