import { Pagination as PaginationAnt } from 'antd';
import type { PaginationProps } from 'antd';
import styles from './Pagination.module.scss';

interface IProps {
  page: number;
  onChange: PaginationProps['onChange'];
}

function Pagination(props: IProps) {
  const { page, onChange } = props;

  return (
    <div className={styles.pagination}>
      <PaginationAnt
        current={page}
        onChange={onChange}
        total={500}
        showSizeChanger={false}
      />
    </div>
  );
}

export default Pagination;
