import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice"
import roleReducer from "./role.slice";
const rootReducer = {
    auth: authReducer,
    role: roleReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;