import { ChangeEvent, useCallback, useMemo, useEffect, useState } from 'react';
import Pagination from './pagination';
import '../styles/Results.module.css';
import Item from './item';
import Loader from './loader';
import { ListItem } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { getBeers, useGetBeersQuery } from '@/features/apiSlice';
import { setResults } from '@/features/resultsSlice';
import { useAppSelector } from '@/features/hooks';

type Props = {
    items: ListItem[]
  }

function Result(props: Props) {
  const searchString = useSelector((state: RootState) => state.search.value);
  
  const pageLimit = 10; //useSelector((state: RootState) => state.pageLimit.value);
  const currentPage = 1;
  const totalPages = 3;
  const [items, setItems] = useState<ListItem[]>();

  const urlBase = 'https://api.punkapi.com/v2/beers';
  const dispatch = useDispatch();

  const params = new URLSearchParams({ beer_name: searchString });
  const paramsString = params.toString();
  let url = searchString ? `${urlBase}?${paramsString}` : urlBase;
  url = searchString
    ? url + `&page=${currentPage}&per_page=${pageLimit}`
    : url + `?page=${currentPage}&per_page=${pageLimit}`;

  const { data, isLoading } = useGetBeersQuery({ url, limit: pageLimit });

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


  const handlePageChange = (page: number): void => {
   // setCurrentPage(page);
  };

  const itemClickHandler = (id: number) => {
    //navigate(`/details/${id}`, { state: { id } });
  };


  const listApi = async (url: string): Promise<ListItem[]> => {
    const response = await fetch(url);
    const items = await response.json();
    return items as ListItem[];
  };

  return (
    <div>
      <div className="page-limit-block">
        <span className="text">Items per page:</span>
        <select
          className="margin select-field"
          value={pageLimit}
         
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
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
}

export default Result;