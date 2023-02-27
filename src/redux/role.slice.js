import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: "role",
    initialState: {
        admin: {
            listUsers: null,
            currentUser: null,
        },
    },
    reducers: {
        getListUsers: (state, action) => {
            state.admin.listUsers = action.payload;
        },
        addCurrentUser: (state, action) => {
            state.admin.currentUser = action.payload
        }
    }
})

export const { getListUsers, addCurrentUser} = roleSlice.actions;
export default roleSlice.reducer;