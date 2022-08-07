import { createSlice } from "@reduxjs/toolkit";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[] | null;
  currentWork: string | null;
  workNames: { [key: string]: string }[];
  data: {
    [key: string]: Cell;
  } | null;
}

const initialState: CellsState = {
  loading: false,
  error: null,
  currentWork: null,
  workNames: [],
  order: null,
  data: null,
};

const cellsSlice = createSlice({
  name: "cells",
  initialState: initialState,
  reducers: {
    setWorkNames(state, action) {
      state.workNames = action.payload;
    },
    saveCellsError(state, action) {
      state.error = action.payload;
    },
    setCurrentWork(state, action) {
      state.currentWork = action.payload;
    },
    fetchCells(state) {
      state.loading = true;
      state.error = null;
    },

    setCells(state, action) {
      const { order, data } = action.payload;
      state.order = order;
      state.data = data;
    },

    updateCell(state, action) {
      const { id, content } = action.payload;
      if (state.data) state.data[id].content = content;
    },

    deleteCell(state, action) {
      state.order = action.payload;
    },
    moveCell(state, action) {
      const { index, targetIndex } = action.payload;
      if (state.order) {
        const temp = state.order[index];
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = temp;
      }
    },

    insertCellAfter(state, action) {
      const { cell, foundIndex } = action.payload;
      if (!state.data) {
        state.data = {};
      }

      if (!state.order) {
        state.order = [];
      }
      state.data[cell.id] = cell;
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
    },
  },
});

export const cellsActions = cellsSlice.actions;
export default cellsSlice.reducer;
