import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedUserIdState {
  id: string | null;
}

const initialState: SelectedUserIdState = {
  id: null,
};

export const selectedUserIdSlice = createSlice({
  name: 'selectedUserId',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearSelectedUserId: (state) => {
      state.id = null;
    },
  },
});
export const selectedUserIdReducer = selectedUserIdSlice.reducer;
export const { setSelectedUserId, clearSelectedUserId } = selectedUserIdSlice.actions;
export const selectCurrentId = (state: { selectedUserId: SelectedUserIdState }) => 
  state.selectedUserId.id;