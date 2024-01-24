import { createSlice } from "@reduxjs/toolkit";

let initialState = false;


const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setVisible: (state, action) => {
      return action.payload;
    }
  }
});

export const { setVisible } = drawerSlice.actions;
export default drawerSlice.reducer;
