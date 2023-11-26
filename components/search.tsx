import React, { ChangeEvent, useCallback } from "react";
import styles from "../styles/Search.module.css";
import { changSearch } from "../features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

interface SearchProps {
  onSearch: (value: string) => void;
}

function Search() {
  const searchString = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();
  
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changSearch(e.target.value));
  }, []);

  return (
    <div className={styles.searchBlock}>
      <input
        className={styles.searchField}
        type="search"
        data-testid="search-input"
        id="search"
        value={searchString}
        onChange={handleInputChange}
      />
      <button className={styles.searchButton} data-testid="search-button">
        Search
      </button>
    </div>
  );
}

export default Search;