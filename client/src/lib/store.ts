import { configureStore } from "@reduxjs/toolkit";
import taskModal from "./slices/taskModal";
export const makeStore = () => {
  return configureStore({
    reducer: {
      taskModal: taskModal,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
