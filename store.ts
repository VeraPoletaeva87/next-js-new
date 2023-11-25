import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import resultsReducer from "./features/resultsSlice";
import { beerApi } from "./features/apiSlice";

export const store = configureStore({
    reducer: {
      search: searchReducer,
      results: resultsReducer,
      [beerApi.reducerPath]: beerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(beerApi.middleware),
  });

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
