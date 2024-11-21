import { Card, Flex } from 'antd';

import { parse, format } from 'date-fns';

import { Component } from 'react';
import styles from './ListMovies.module.scss';
import { Data } from '@/types';
import Genres from '../Genre/Genres';

const { Meta } = Card;

const styleImg = {
  width: '187px',
  height: '279px',
  borderRadius: '0px',
};

interface IState {
  data: Array<{ title: string; id: number }>;
}

interface IProps {
  data: Data;
}

class ListMovies extends Component<IProps, IState> {
  constructor() {
    super(undefined);
  }

  static getDate(dateString: string) {
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    const formattedDate = format(parsedDate, 'MMMM d, yyyy');
    return formattedDate;
  }

  render() {
    const { data } = this.props;

    return (
      <div className={styles.listMovies}>
        <Flex wrap="wrap" justify="space-around" align="center" gap="large">
          {data?.results.map(
            (film) =>
              film !== null && (
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
                  <Meta
                    className={styles.meta}
                    title={<div className={styles.title}>{film.title}</div>}
                    description={
                      <div className={styles.description}>
                        <div
                          className={styles.releaseDate}
                        >{`${ListMovies.getDate(film.release_date)}`}</div>
                        <Genres film={film} />
                        <div
                          className={styles.overview}
                        >{`${film.overview.slice(0, 100)}...`}</div>
                      </div>
                    }
                  />
                </Card>
              ),
          )}
        </Flex>
      </div>
    );
  }
}

export default ListMovies;
