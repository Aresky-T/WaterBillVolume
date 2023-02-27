import { createSlice } from "@reduxjs/toolkit";

const waterSlice = createSlice({
    name: "water",
    initialState:{
        volumn: {
            data: null
        },
        bill: {
            data: null
        }
    },
    reducers: {
        addVolume: (state, action) => {
            state.volumn.data = action.payload;
        },
        addBill: (state, action) => {
            state.bill.data = action.payload;
        },
        clearData: (state) => {
            state.bill.data = null;
            state.volumn.data = null;
        }
    }
})

export const {addBill, addVolume, clearData} = waterSlice.actions;
export default waterSlice.reducer;