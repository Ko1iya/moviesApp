import { Button, Flex } from 'antd';
import { useContext } from 'react';
import { item } from '@/types';

import styles from './Genres.module.scss';
import { AppContext } from '../App/App';

interface IProps {
  film: item;
}

function Genres(prop: IProps) {
  const { film } = prop;
  const { genres } = useContext(AppContext);

  return (
    <Flex gap="8px" wrap="wrap" className={styles.genres}>
      {film.genre_ids.map((id: number) => (
        <Button key={id} className={styles.button}>{`${genres[id]}`}</Button>
      ))}
    </Flex>
  );
}

export default Genres;
