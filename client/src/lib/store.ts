import { configureStore } from "@reduxjs/toolkit";
import taskModalSlice from "./slices/taskModalSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      taskModal: taskModalSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
