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
            state.volume.data = action.payload;
        },
        addBill: (state, action) => {
            state.bill.data = action.payload;
        }
    }
})

export const {addBill, addVolume} = waterSlice.actions;
export default waterSlice.reducer;