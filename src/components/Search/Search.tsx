import { Input } from 'antd';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import styles from './Search.module.scss';

interface IProps {
  searchFunc: (text: string) => void;
}

function Search(props: IProps) {
  const { searchFunc } = props;
  const [currentText, setCurrentText] = useState('');

  const updateText = useCallback(debounce(searchFunc, 500), []);

  useEffect(() => {
    updateText(currentText);
  }, [currentText]);

  return (
    <div className={styles.search}>
      <Input
        placeholder="Type to search..."
        value={currentText}
        onChange={(e) => {
          setCurrentText(e.target.value);
        }}
      />
    </div>
  );
}

export default Search;
