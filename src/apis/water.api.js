import axios from "axios";

const baseUrl = "http://localhost:3000/api/water"

const configApi = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const getVolumeForUser = (data, token) => {
    const config = configApi(token);
    return axios.get(baseUrl, data, config)
}

export const getBillForUser = (data, token) => {
    const config = configApi(token);
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // }
    return axios.get(`${baseUrl}/bill`, { params: data }, config);
}