import Search from '../Search/Search';
import ToggleSearch from '../ToggleSearch/ToggleSearch';
import styles from './Header.module.scss';

function Header() {
  return (
    <div className={styles.header}>
      <ToggleSearch />
      <Search />
    </div>
  );
}

export default Header;
