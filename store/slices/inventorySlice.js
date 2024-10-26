import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPages: 0,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    loadItems: (state, action) => {
      state.items = action.payload.items;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { addItem, updateItem, removeItem, loadItems } =
  inventorySlice.actions;

export default inventorySlice.reducer;
