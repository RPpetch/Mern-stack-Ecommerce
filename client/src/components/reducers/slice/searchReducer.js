import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "", 
};

const searchSlice = createSlice({
  name: 'search', 
  initialState,
  reducers: {
    SearchQuery: (state, action) => {
      state.text = action.payload; 
    },
  },
});

export const { SearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
