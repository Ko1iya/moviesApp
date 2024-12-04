import { Alert, Flex, Spin, Typography } from 'antd';

import { parse, format } from 'date-fns';

import { Component } from 'react';

import styles from './ListMovies.module.scss';
import { Data, item } from '@/types';
import Movie from '../Movie/Movie';
import ApiService from '@/services/apiService';

interface IState {
  dataRated: Data;
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
      dataRated: null,
      data: null,
      load: true,
      err: null,
      guestId: null,
    };
  }

  componentDidMount(): void {
    this.getData();
    this.getIdGuest();
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { page, searchText, isRated } = this.props;
    const { guestId } = this.state;

    if (prevProps.page !== page) {
      this.getData();
      this.changeDataForRated(guestId, page);
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

  getRateFilm(id: number) {
    const { dataRated } = this.state;

    let rate;

    if (dataRated?.results) {
      dataRated.results.forEach((el: item) => {
        if (el.id === id) {
          rate = el.rating;
        }
      });
    }
    return rate;
  }

  changeDataForRated(guest: string, page: number) {
    this.apiService
      .getRatedMovies(guest, page)
      .then((res: Data) => {
        this.setState({ dataRated: res, load: false });
      })
      .catch(() => {
        this.setState({
          dataRated: { page: 1, results: [], total_pages: 0, total_results: 0 },
          load: false,
        });
      });
  }

  render() {
    const { data, load, err, guestId, dataRated } = this.state;
    const { page, isRated } = this.props;

    const finalData = isRated ? dataRated : data;

    const error = err ? (
      <Alert message="Блин, ошибка :(" description={`${err}`} type="error" />
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

    let listMovies = null;

    if (!load && !error) {
      if (page > 1 && finalData?.results.length === 0) {
        listMovies = (
          <div className={styles.listMovies}>
            <Flex wrap="wrap" justify="center" align="center" gap="large">
              <Typography>По такому запросу больше нет фильмов!</Typography>
            </Flex>
          </div>
        );
      } else if (page === 1 && finalData?.results.length === 0) {
        listMovies = (
          <div className={styles.listMovies}>
            <Flex wrap="wrap" justify="center" align="center" gap="large">
              <Typography>Ничего не найдено</Typography>
            </Flex>
          </div>
        );
      } else {
        listMovies = (
          <div className={styles.listMovies}>
            <Flex wrap="wrap" justify="center" align="center" gap="large">
              {finalData?.results.map(
                (film) =>
                  film !== null && (
                    <Movie
                      film={film}
                      getDate={ListMovies.getDate}
                      key={film.id}
                      guestId={guestId}
                      rate={this.getRateFilm(film.id)}
                    ></Movie>
                  ),
              )}
            </Flex>
          </div>
        );
      }
    }

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
