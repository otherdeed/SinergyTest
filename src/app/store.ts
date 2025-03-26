import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { Api } from "./service/api";
import { selectedUserIdReducer } from "./service/currentSlice";

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    selectedUserId: selectedUserIdReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(Api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;