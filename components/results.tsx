import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Pagination from './pagination';
import '../styles/Results.module.css';
import Item from './item';
import Loader from './loader';
import { ListItem } from '../types';

type Props = {
    items: ListItem[]
  }

function Result(props: Props) {
  const searchString = ''; //useSelector((state: RootState) => state.search.value);
  const pageLimit = 10; //useSelector((state: RootState) => state.pageLimit.value);
  const currentPage = 1;
  const totalPages = 3;

  const isLoading = false;


  const urlBase = 'https://api.punkapi.com/v2/beers';
  const params = new URLSearchParams({ beer_name: searchString });
  const paramsString = params.toString();
  let url = searchString ? `${urlBase}?${paramsString}` : urlBase;
  url = searchString
    ? url + `&page=${currentPage}&per_page=${pageLimit}`
    : url + `?page=${currentPage}&per_page=${pageLimit}`;

 // const { data, isLoading } = useGetBeersQuery({ url, limit: pageLimit });

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
          {props.items?.length ? (
            props.items?.map((item: ListItem) => (
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