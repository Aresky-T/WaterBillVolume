import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: "role",
    initialState: {
        admin: {
            listUsers: null
        }
    },
    reducers: {
        getListUsers: (state, action) => {
            state.admin.listUsers = action.payload;
        }
    }
})

export const { getListUsers } = roleSlice.actions;
export default roleSlice.reducer;