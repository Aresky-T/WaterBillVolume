import axios from "axios";
import { loginStart } from "../redux/auth.slice";

const localUrl = "http://localhost:3000/api";

export const loginUserApi = async (data, dispatch) => {
    dispatch(loginStart());
    return axios.post(`${localUrl}/auth/login`, data)
}

export const loginAdminApi = async (data, dispatch) => {
    dispatch(loginStart());
    return axios.post(`${localUrl}/auth/login`, data)
}

export const getUsersByAdmin = async (token) => {
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }
    return await axios.get(`${localUrl}/admin/users`, config);
}