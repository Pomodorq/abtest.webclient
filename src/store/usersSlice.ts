import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { ProfilerMsg } from '../model/ProfilerMsg';

// Define a type for the slice state
export interface UsersState {
  profiler: ProfilerMsg[];
}
// Define the initial state using that type
const initialState: UsersState = {
  profiler: [],
};

export const usersSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ProfilerMsg>) => {
      state.profiler = [...state.profiler, action.payload];
    },
    clear: (state) => {
      state = { profiler: [] };
    },
  },
});

export const { add, clear } = usersSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectProfiler = (state: RootState) => state.users.profiler;

export default usersSlice.reducer;
