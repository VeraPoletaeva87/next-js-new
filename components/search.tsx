import React from "react";
import styles from "../styles/Search.module.css";

interface SearchProps {
  onSearch: (value: string) => void;
}

function Search() {
  const searchString = "";

  return (
    <div className={styles.searchBlock}>
      <input
        className={styles.searchField}
        type="search"
        data-testid="search-input"
        id="search"
        value={searchString}
      />
      <button className={styles.searchButton} data-testid="search-button">
        Search
      </button>
    </div>
  );
}

export default Search;