import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import pageLimitReducer from './features/pageLimitSlice';
import totalPagesReducer from "./features/totalPagesSlice";
import resultsReducer from "./features/resultsSlice";
import { beerApi } from "./features/apiSlice";

export const store = configureStore({
    reducer: {
      search: searchReducer,
      pageLimit: pageLimitReducer,
      totalPages: totalPagesReducer,
      results: resultsReducer,
      [beerApi.reducerPath]: beerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(beerApi.middleware),
  });

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
