import { Alert, Flex, Spin, Typography } from 'antd';

import { parse, format } from 'date-fns';

import { Component } from 'react';

import styles from './ListMovies.module.scss';
import { Data } from '@/types';
import Movie from '../Movie/Movie';
import ApiService from '@/services/apiService';

interface IState {
  // dataRate: Data | 'Вы еще не оценивали фильмы';
  data: Data;
  load: boolean;
  err: object | null;
  guestId: string | null;
}

interface IProps {
  page: number;
  searchText: string;
  isRated: boolean;
}

class ListMovies extends Component<IProps, IState> {
  apiService = new ApiService();

  static getDate(dateString: string) {
    if (!dateString) {
      return 'Дата выхода не известна';
    }
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    const formattedDate = format(parsedDate, 'MMMM d, yyyy');
    return formattedDate;
  }

  constructor(props: IProps) {
    super(props);

    this.state = {
      // dataRate: 'Вы еще не оценивали фильмы',
      data: null,
      load: true,
      err: null,
      guestId: null,
    };
  }

  componentDidMount(): void {
    this.getData();

    // this.setState({guestId: this.getIdGuest().th)
    this.getIdGuest();
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { page, searchText, isRated } = this.props;
    const { guestId } = this.state;

    if (prevProps.page !== page) {
      this.getData();
    }

    if (prevProps.searchText !== searchText) {
      this.getData();
    }

    if (prevProps.isRated !== isRated && isRated) {
      this.changeDataForRated(guestId, page);
    }

    if (prevProps.isRated !== isRated && !isRated) {
      this.getData();
    }
  }

  getData() {
    const { page, searchText } = this.props;

    this.apiService
      .getResource(page, searchText)
      .then((res: Data) => {
        this.setState({ data: res, load: false });
      })
      .catch((err) => {
        this.setState({ err, load: false });
      });
  }

  getIdGuest() {
    this.apiService.createGuestSession().then((res) => {
      this.setState({ guestId: res.guest_session_id });
    });
  }

  changeDataForRated(guest: string, page: number) {
    this.apiService
      .getRatedMovies(guest, page)
      .then((res: Data) => {
        this.setState({ data: res, load: false });
      })
      .catch(() => {
        this.setState({ data: null, load: false });
      });
  }

  render() {
    const { data, load, err, guestId } = this.state;
    const { page } = this.props;

    const massage =
      page > 1 && data?.results.length === 0
        ? ' По такому запросу больше нет фильмов!'
        : 'Ничего не найдено';

    const error = err ? (
      <Alert message="Блин, ошибка :(" description={`${err}`} type="error" />
    ) : null;

    const listMovies =
      !load && !error ? (
        <div className={styles.listMovies}>
          <Flex wrap="wrap" justify="center" align="center" gap="large">
            {data?.results.length > 0 ? (
              data?.results.map(
                (film) =>
                  film !== null && (
                    <Movie
                      film={film}
                      getDate={ListMovies.getDate}
                      key={film.id}
                      guestId={guestId}
                    ></Movie>
                  ),
              )
            ) : (
              <Typography>{massage}</Typography>
            )}
          </Flex>
        </div>
      ) : null;

    const spin = load ? (
      <div className={styles.listMovies}>
        <Flex
          wrap="wrap"
          justify="space-around"
          align="center"
          gap="large"
          style={{ height: '100%' }}
        >
          <Spin size="large" />
        </Flex>
      </div>
    ) : null;

    return (
      <>
        {error}
        {listMovies}
        {spin}
      </>
    );
  }
}

export default ListMovies;
