import { configureStore } from "@reduxjs/toolkit";
import aogButtonsControlSlice from "./aogButtonsControl-slice";
import aogClientDataSlice from "./aogClientData-slice";

const store = configureStore({
  reducer: {
    aogClientData: aogClientDataSlice,
    aogButtonsControl: aogButtonsControlSlice,
  },
});

export default store;
