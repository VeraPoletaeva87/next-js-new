import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Pagination from './pagination';
import '../styles/Results.module.css';
import Item from './item';
import { ListItem } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetBeersQuery } from '../features/apiSlice';
import { setResults } from '../features/resultsSlice';
import { changPageLimit } from '../features/pageLimitSlice';
import { useRouter } from 'next/router';
import { changeTotalPages } from '../features/totalPagesSlice';

type Props = {
    items: ListItem[]
  }

function Result(props: Props) {
  const router = useRouter();
  const searchString = useSelector((state: RootState) => state.search.value);
  
  const pageLimit = useSelector((state: RootState) => state.pageLimit.value);
  const totalPages = useSelector((state: RootState) => state.totalPages.value);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [items, setItems] = useState<ListItem[]>(props.items ?? []);

  const urlBase = 'https://api.punkapi.com/v2/beers';
  const dispatch = useDispatch();

  const params = new URLSearchParams({ beer_name: searchString });
  const paramsString = params.toString();
  let url = searchString ? `${urlBase}?${paramsString}` : urlBase;
  url = searchString
    ? url + `&page=${currentPage}&per_page=${pageLimit}`
    : url + `?page=${currentPage}&per_page=${pageLimit}`;

  const { data } = useGetBeersQuery({ url, limit: pageLimit });

  useEffect(() => {
    if (props.items) {
      dispatch(setResults(props.items));
      setItems(props.items);
    }
  }, [dispatch, props.items]);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

 const { length } = items;

  const handleItemsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      dispatch(changPageLimit(+e?.target.value));
      const pagesCount = (Math.ceil( length / +e?.target.value));
      dispatch(changeTotalPages(pagesCount)); 
    },
    [dispatch, length]
  );

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const itemClickHandler = (id: number) => {
    router.push(`/details/${id}`);
  };

  return (
    <div>
      <div className="page-limit-block">
        <span className="text">Items per page:</span>
        <select
          className="margin select-field"
          value={pageLimit}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageLimit={pageLimit}
        onPageChange={handlePageChange}
      />
        <ul data-testid="list">
          {items?.length ? (
            items?.map((item: ListItem) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                clickHandler={itemClickHandler}
              />
            ))
          ) : (
            <h2 data-testid="empty-text">No items</h2>
          )}
        </ul>
    </div>
  );
}

export default Result;