import {createSlice} from "@reduxjs/toolkit";
export interface LoginState {
    value: number;
    status: 'login' | 'logout' ;
}

const initialState: LoginState = {
    value: 0,
    status: 'login',
};




export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        login:(status)=>{
            status.value = 1;
        },
        logout:(status)=>{
            status.value = 0;
        }
    }

})