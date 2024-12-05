import { Card, Rate, Typography } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { item } from '@/types';

import styles from './Movie.module.scss';
import Genres from '../Genre/Genres';
import ApiService from '@/services/apiService';

const styleImg = {
  width: '187px',
  height: '279px',
  borderRadius: '0px',
};

interface IProps {
  film: item;
  getDate: (str: string) => void;
  guestId: string;
  rate: number;
}

function Movie(prop: IProps) {
  const titleRef = useRef(null);
  const genresRef = useRef(null);

  const { film, getDate, guestId, rate } = prop;

  const [height, setHeight] = useState(0);
  const [value, setValue] = useState(rate || 0);
  const [ishaveRate, setIsHaveRate] = useState(!!film.rating || false);

  const currentRate = Math.round(film.vote_average * 10) / 10;

  const colorPopularity = () => {
    if (currentRate < 3) {
      return '#E90000';
    }
    if (currentRate < 5) {
      return '#E97E00';
    }
    if (currentRate < 7) {
      return '#E9D100';
    }
    return '#66E900';
  };

  const changeValue = (val: number) => {
    if (ishaveRate) {
      setValue(0);
      setIsHaveRate(false);
      return;
    }
    setValue(val);
  };

  useEffect(() => {
    const title = titleRef.current;
    const genres = genresRef.current;

    if (title && genres) {
      setHeight(title.clientHeight + genres.clientHeight);
    }
  }, [titleRef, genresRef]);

  function sliceStr(str: string, len: number) {
    const newstr = str.split(' ').reduce((acc: string, el: string) => {
      const res = acc.length < len * -1.94 + 333 ? `${acc} ${el}` : acc;

      return res;
    }, '');

    if (newstr.length === str.length + 1) {
      return str;
    }

    return `${newstr}...`;
  }

  useEffect(() => {
    if (value === 0) {
      return;
    }

    ApiService.rateMovie(guestId, film.id, value);
  }, [value]);

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
        <div className={styles.headerMovie}>
          <Typography.Title level={4} className={styles.title} ref={titleRef}>
            {film.title}
          </Typography.Title>
          <div
            style={{
              borderColor: colorPopularity(),
            }}
            className={styles.popularity}
          >
            {currentRate}
          </div>
        </div>

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
          <Rate
            onChange={changeValue}
            value={value}
            count={10}
            style={{ fontSize: '16px' }}
            className={styles.rate}
            allowClear
          />
        </div>
      </div>
    </Card>
  );
}

export default Movie;
