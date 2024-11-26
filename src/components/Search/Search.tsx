import { Input } from 'antd';
import styles from './Search.module.scss';

function Search() {
  return (
    <div className={styles.search}>
      <Input placeholder="Type to search..." />
    </div>
  );
}

export default Search;
