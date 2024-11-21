import { Button, Flex } from 'antd';
import { item } from '@/types';
import genresSorted from '@/data/data';

import styles from './Genres.module.scss';

interface IProps {
  film: item;
}

function Genres(prop: IProps) {
  const { film } = prop;

  return (
    <Flex gap="8px" wrap="wrap" className={styles.genres}>
      {film.genre_ids.map((id: number) => (
        <Button
          key={id}
          className={styles.button}
        >{`${genresSorted[id]}`}</Button>
      ))}
    </Flex>
  );
}

export default Genres;
