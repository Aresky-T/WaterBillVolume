import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice"
import roleReducer from "./role.slice";
import waterReducer from "./water.slice";

const rootReducer = {
    auth: authReducer,
    role: roleReducer,
    water: waterReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;