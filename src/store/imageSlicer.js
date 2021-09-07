import { createSlice } from "@reduxjs/toolkit";
const imgSlice = createSlice({
  name: "imgSlice",
  initialState: {
    images: [],
  },
  reducers: {
    getImg(state, action) {
      const res = state.images.concat([action.payload]);
      state.images = res;
    },
    changeXY(state, action) {
      const { id, x, y } = action.payload;
      const toggledImg = state.images.find((todo) => todo.id === id);
      toggledImg.x = x;
      toggledImg.y = y;
    },
    loadState(state, action) {
      state.images = action.payload;
    },
    clear(state) {
      state.images = [];
    },
  },
});
export const { getImg, changeXY, loadState, clear } = imgSlice.actions;
export default imgSlice.reducer;
