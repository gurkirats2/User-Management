import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../model/user.model";

interface UserData{
    data:User[] | null;
}
const initialState:UserData={
    data:null
}

export const userSlice = createSlice({
    name:"userInfo",
    initialState,
    reducers:{
        setUser: (state,action:PayloadAction<User[]>) =>{
            state.data=action.payload
        }
    }
})

export const  {setUser} = userSlice.actions;