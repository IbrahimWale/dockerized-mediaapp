import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.js";
import mediaReducer from "../features/medias/mediaSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medias: mediaReducer,
  },
});

export default store;
