import Search from '../Search/Search';
import ToggleSearch from '../ToggleSearch/ToggleSearch';
import styles from './Header.module.scss';

interface IProps {
  searchFunc: (text: string) => void;
}

function Header(props: IProps) {
  const { searchFunc } = props;

  return (
    <div className={styles.header}>
      <ToggleSearch />
      <Search searchFunc={searchFunc} />
    </div>
  );
}

export default Header;
