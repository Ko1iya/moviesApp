import { Component } from 'react';
import ApiService from '@/services/apiService';
import ListMovies from '../ListMovies/ListMovies';
import { Data } from '@/types';
import styles from './App.module.scss';

interface IState {
  data: Data;
}

class App extends Component<object, IState> {
  apiService = new ApiService();

  constructor() {
    super(undefined);

    this.state = {
      data: null,
    };

    this.getData();
  }

  getData() {
    this.apiService.getResource().then((res: Data) => {
      this.setState({ data: res });
    });
  }

  render() {
    const { data } = this.state;

    return (
      
      <div className={styles.App}>
        <ListMovies data={data} />
      </div>
    );
  }
}

export default App;
