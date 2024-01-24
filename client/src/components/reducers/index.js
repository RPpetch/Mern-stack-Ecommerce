import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userReducer'
import searchReducer from "./slice/searchReducer";
import cartReducer from "./slice/cartReducer";
import drawerReducer from "./slice/drawerReducer";

const store = configureStore({
    reducer:{
        user: userReducer,
        search:searchReducer,
        cart:cartReducer,
        drawer:drawerReducer
    }
})

export default store;