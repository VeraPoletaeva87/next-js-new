import React from 'react';
import styles from '../styles/Pagination.module.css';

interface pageProps {
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  onPageChange: (value: number) => void;
}

const Pagination = (props: pageProps) => {
  const { currentPage, totalPages, onPageChange } = props;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationContainer}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pageNumbers.map((page) => (
        <button 
          className={`${styles.paginationItem} ${page === currentPage ? styles.paginationActive : ''}`}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;