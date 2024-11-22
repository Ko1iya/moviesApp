import { Flex } from 'antd';

import { parse, format } from 'date-fns';

import { Component } from 'react';
import styles from './ListMovies.module.scss';
import { Data } from '@/types';
import Movie from '../Movie/Movie';

interface IState {
  titleHeight: number[];
}

interface IProps {
  data: Data;
}

class ListMovies extends Component<IProps, IState> {
  static getDate(dateString: string) {
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    const formattedDate = format(parsedDate, 'MMMM d, yyyy');
    return formattedDate;
  }

  constructor() {
    super(undefined);
  }

  render() {
    const { data } = this.props;

    return (
      <div className={styles.listMovies}>
        <Flex wrap="wrap" justify="space-around" align="center" gap="large">
          {data?.results.map(
            (film) =>
              film !== null && (
                <Movie film={film} getDate={ListMovies.getDate}></Movie>
              ),
          )}
        </Flex>
      </div>
    );
  }
}

export default ListMovies;
