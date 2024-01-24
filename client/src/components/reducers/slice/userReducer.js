import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:0
}

const UserSlice = createSlice({
    name:'user',
    initialState:{
        token:"",
        username:"",
        role:"",
        type:""
    },
  reducers: {
    userLogin: (state,action) => {
     const {token,username,role,type} = action.payload
     state.token = token;
     state.username = username;
     state.role = role;
     state.type = type;
    },
    userLogout: (state,action) => {
      state.token = "";
      state.username = "";
      state.role = "";
      state.type = "";
    },
  },
});

export const {userLogin,userLogout} =UserSlice.actions; 
export default UserSlice.reducer;