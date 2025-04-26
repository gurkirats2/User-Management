import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../model/user.model";

interface EditUser{
    data:User | null;
}
const initialState:EditUser={
    data:null
}

export const editUserInfoSlice = createSlice({
    name:"editUserInfo",
    initialState,
    reducers:{
        setEditUserInfo: (state,action:PayloadAction<User | null>) =>{
            console.log(state,action)
            state.data=action.payload
        }
    }
})

export const  {setEditUserInfo} = editUserInfoSlice.actions;