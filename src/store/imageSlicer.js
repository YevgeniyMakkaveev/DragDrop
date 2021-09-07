import { createSlice } from "@reduxjs/toolkit";
const imgSlice = createSlice({
  name: "imgSlice",
  initialState: {
    images: [],
  },
  reducers: {
    getImg(state, action) {
      console.log(action.payload);
      const res = state.images.concat([action.payload]);
      console.log(res);
      state.images = res;
    },
    changeXY(state, action) {
      const { id, x, y } = action.payload;
      console.log(action.payload);
      const toggledImg = state.images.find((todo) => todo.id === id);
      toggledImg.x = x;
      toggledImg.y = y;
    },
  },
});
export const { getImg, changeXY } = imgSlice.actions;
export default imgSlice.reducer;
