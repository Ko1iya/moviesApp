import Search from '../Search/Search';
import ToggleSearch from '../ToggleSearch/ToggleSearch';
import styles from './Header.module.scss';

interface IProps {
  searchFunc: (text: string) => void;
  toggleIsRated: () => void;
}

function Header(props: IProps) {
  const { searchFunc, toggleIsRated } = props;

  return (
    <div className={styles.header}>
      <ToggleSearch toggleIsRated={toggleIsRated} />
      <Search searchFunc={searchFunc} />
    </div>
  );
}

export default Header;
