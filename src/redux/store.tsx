import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "../utils/types";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    list: [
      {
        name: "Ove",
        age: 23,
        sex: "Male",
        mobile: "9233123123",
        country: "India",
      },
    ] as UserT[],
  },
  reducers: {
    addData: (state, action: PayloadAction<UserT>) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      state.list = [...state?.list, action.payload];
    },
  },
});

export const { addData } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
