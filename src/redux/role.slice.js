import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: "role",
    initialState: {
        admin: {
            listUsers: null,
            currentUser: null,
            page: null
        }
    },
    reducers: {
        getListUsers: (state, action) => {
            state.admin.listUsers = action.payload;
        },
        addCurrentUser: (state, action) => {
            state.admin.currentUser = action.payload
        },
        addPage: (state, action) => {
            state.admin.page = action.payload
        },
    }
})

export const { getListUsers, addCurrentUser, addPage } = roleSlice.actions;
export default roleSlice.reducer;