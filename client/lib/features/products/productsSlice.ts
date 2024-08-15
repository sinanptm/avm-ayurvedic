import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"products",
    initialState:[{id:1,name:"Product 1"}],
    reducers:{
        addProduct(state,action:PayloadAction<string>){
            state.push({id:state.length+1,name:action.payload})
        }
    }
})

export default productSlice.reducer