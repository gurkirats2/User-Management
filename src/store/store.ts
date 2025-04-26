import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { editUserInfoSlice } from "./slices/editUserInfo.slice";
import { userSlice } from "./slices/addUser.slice";

const store = configureStore({
    reducer:{
      [editUserInfoSlice.name]:editUserInfoSlice.reducer,
      [userSlice.name]:userSlice.reducer
    }
})

export type defaultStore = ReturnType<typeof store.getState>
setupListeners(store.dispatch);

export default store;