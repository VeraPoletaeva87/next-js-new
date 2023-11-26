import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TotalPagesState {
  value: number;
}

export const totalPagesSlice = createSlice({
  name: 'totalPages',
  initialState: { value: 3 },
  reducers: {
    changeTotalPages: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { changeTotalPages } = totalPagesSlice.actions;

export default totalPagesSlice.reducer;