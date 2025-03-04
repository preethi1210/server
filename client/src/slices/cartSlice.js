import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"
const initialState={
    totalItem:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0
};
const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
      setToken(state,value) {
        state.token=value.payLoad;
      } ,
      //add to cart
      //remove from cart
      //reset cart
    }
})
export const {setToken}=cartSlice.actions;
export default cartSlice.reducer;