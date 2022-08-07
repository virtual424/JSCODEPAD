import { createSlice } from "@reduxjs/toolkit";

interface User {
  uid: string;
  name: string;
  email: string;
}

interface userState {
  user: User | null;
  error: string;
  loading: boolean;
}

const initialState: userState = {
  user: null,
  error: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
