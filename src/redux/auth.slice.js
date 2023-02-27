import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            role: localStorage.getItem('role'),
            token: localStorage.getItem('access_token'),
            isLoading: false,
            isError: false,
            loginErrorMessage: null,
        },
        register: {
            isLoading: false,
            isSuccess: false,
            isError: false,
            registerSuccessMessage: null,
            registerErrorMessage: null
        }
    },
    reducers: {
        loginStart: state => {
            state.login.role = null;
            state.login.token = null;
            state.login.isLoading = true;
            state.login.isError = false;
            state.login.loginErrorMessage = null;
        },
        loginUserSuccess: (state, action) => {
            state.login.isLoading = false;
            state.login.token = action.payload;
            state.login.role = "user"
        },
        loginAdminSuccess: (state, action) => {
            state.login.isLoading = false;
            state.login.token = action.payload;
            state.login.role = "admin"
        },
        loginError: (state, action) => {
            state.login.isLoading = false;
            state.login.isError = true;
            state.login.loginErrorMessage = action.payload;
        },
        registerStart: state => {
            state.register.isLoading = true;
        },
        registerSuccess: (state, action) => {
            state.register.isLoading = false;
            state.register.isError = false;
            state.register.registerErrorMessage = null;
            state.register.isSuccess = true;
            state.register.registerSuccessMessage = action.payload;
        },
        registerError: (state, action) => {
            state.register.isLoading = false;
            state.register.isSuccess = false;
            state.register.isError = true;
            state.register.registerSuccessMessage = null;
            state.register.registerErrorMessage = action.payload;
        },
        logout: state => {
            state.login.role = null;
            state.login.token = null;
            state.login.isLoading = false;
            state.login.isError = false;
            state.register.registerSuccessMessage = null;
            state.login.loginErrorMessage = null;
        },
        clearErrorRedux: (state) => {
            state.login.role = null;
            state.login.loginErrorMessage = null;
            state.register.registerErrorMessage = null;
        }
    }
})

export const {
    loginStart,
    loginUserSuccess,
    loginAdminSuccess,
    loginError,
    registerStart,
    registerSuccess,
    registerError,
    clearErrorRedux,
    logout
} = authSlice.actions;

export default authSlice.reducer;