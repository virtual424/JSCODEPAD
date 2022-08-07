import { createSlice } from "@reduxjs/toolkit";

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const bundlesSlice = createSlice({
  name: "bundles",
  initialState: initialState,
  reducers: {
    bundleStart(state, action) {
      state[action.payload.id] = {
        loading: true,
        code: "",
        err: "",
      };
    },
    bundleComplete(state, action) {
      state[action.payload.id] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
    },
  },
});

export const bundlesActions = bundlesSlice.actions;
export default bundlesSlice.reducer;
