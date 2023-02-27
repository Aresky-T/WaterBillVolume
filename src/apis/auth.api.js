import axios from "axios";
import { loginStart } from "../redux/auth.slice";

const localUrl = "http://localhost:3000/api";

export const loginUserApi = (data, dispatch) => {
    dispatch(loginStart());
    return axios.post(`${localUrl}/auth/login`, data)
}

export const loginAdminApi = (data, dispatch) => {
    dispatch(loginStart());
    return axios.post(`${localUrl}/auth/login`, data)
}

export const getUsersByAdmin = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.get(`${localUrl}/admin/users`, config);
}