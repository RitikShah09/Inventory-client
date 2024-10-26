import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/authSlice";
import inventory from "./slices/inventorySlice";

export const store = configureStore({
  reducer: {
    user,
    inventory,
  },
});
