import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  isOpen: false,
};

export const taskModalSlice = createSlice({
  name: "taskmodal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;
