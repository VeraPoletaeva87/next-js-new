import { ListItem } from '@/types';
import { CaseReducer, SliceCaseReducers, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ResultsState {
    value: ListItem[];
}

export interface ResultsReducer extends SliceCaseReducers<ResultsState> {
  setResults: CaseReducer<ResultsState, PayloadAction<ListItem[]>>;
}

export const resultsSlice = createSlice <ResultsState, ResultsReducer>({
  name: 'results',
  initialState: { value: [] },
  reducers: {
    setResults: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setResults } = resultsSlice.actions;

export default resultsSlice.reducer;