import { configureStore } from "@reduxjs/toolkit";
import imgReducer from "./imageSlicer";

export default configureStore({
  reducer: {
    imgList: imgReducer,
  },
});
