import { createSlice } from "@reduxjs/toolkit";

interface uiState {
  openModal: boolean;
  error: string | null;
}

const initialState: uiState = {
  openModal: false,
  error: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload.error;
    },
    openModal(state) {
      state.openModal = true;
    },
    closeModal(state) {
      state.openModal = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
