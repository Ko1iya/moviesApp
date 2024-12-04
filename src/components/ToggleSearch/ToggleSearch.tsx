import { Radio } from 'antd';
import styles from './ToggleSearch.module.scss';

interface IProps {
  toggleIsRated: () => void;
  changePage: () => void;
}

function ToggleSearch(props: IProps) {
  const { toggleIsRated, changePage } = props;

  const onChange = () => {
    changePage();
    toggleIsRated();
  };

  return (
    <div className={styles.toggleSearch}>
      <Radio.Group
        defaultValue="a"
        size="large"
        className={styles.butContainer}
        onChange={onChange}
      >
        <Radio.Button value="a" style={{ borderRadius: '0px' }}>
          Search
        </Radio.Button>
        <Radio.Button value="b" style={{ borderRadius: '0px' }}>
          Rated
        </Radio.Button>
      </Radio.Group>
    </div>
  );
}

export default ToggleSearch;
