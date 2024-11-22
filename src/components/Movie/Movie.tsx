import { Card, Typography } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { item } from '@/types';

import styles from './Movie.module.scss';
import Genres from '../Genre/Genres';

const styleImg = {
  width: '187px',
  height: '279px',
  borderRadius: '0px',
};

interface IProps {
  film: item;
  getDate: (str: string) => void;
}

function Movie(prop: IProps) {
  const titleRef = useRef(null);
  const genresRef = useRef(null);

  const { film, getDate } = prop;

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const title = titleRef.current;
    const genres = genresRef.current;

    if (title && genres) {
      setHeight(title.clientHeight + genres.clientHeight);
    }
  }, [titleRef, genresRef]);

  function sliceStr(str: string, len: number) {
    const newstr = str.split(' ').reduce((acc: string, el: string) => {
      const res = acc.length < 250 - len ? `${acc} ${el}` : acc;

      return res;
    }, '');

    if (newstr.length === str.length + 1) {
      return str;
    }

    return `${newstr}...`;
  }

  return (
    <Card
      key={film.id}
      className={styles.card}
      flex-direction="column"
      cover={
        <img
          alt={film.title}
          src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
          style={styleImg}
        />
      }
    >
      <div className={styles.meta}>
        <Typography.Title level={4} className={styles.title} ref={titleRef}>
          {film.title}
        </Typography.Title>

        <div className={styles.description}>
          <div
            className={styles.releaseDate}
          >{`${getDate(film.release_date)}`}</div>

          <div ref={genresRef}>
            <Genres film={film} />
          </div>

          {height > 0 && (
            <div
              className={styles.overview}
            >{`${sliceStr(film.overview, height)}`}</div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default Movie;
