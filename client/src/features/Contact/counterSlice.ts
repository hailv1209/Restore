import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface CounterState {
    data : number ;
    title : string;
}  

const initialState : CounterState = {
    data : 42 ,
    title : 'YARC (yet another redux counte with redux toolkit)'
}

export const counterSlice = createSlice({
    name : 'counter',
    initialState,
    reducers : {
        increment : (state, action) => {
            state.data += action.payload
        },
        decrement : (state, action) => {
            state.data -= action.payload
        }
    }
})

export const {increment,decrement} = counterSlice.actions;