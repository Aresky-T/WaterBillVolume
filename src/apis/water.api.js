import axios from "axios";
import { addBill, addVolume } from "../redux/water.slice";

const baseUrl = "http://localhost:3000/api/water"


export const getVolumeForUser = async (data, token, dispatch) => {
    console.log("Running get volume api...")
    try {
        const response = await fetch(`${baseUrl}?userId=${data.userId}&year=${data.year}&month=${data.month}&date=${data.date}`, {
            method: 'get',
            headers: {
                Authorization: `${token}`
            }
        })

        if (!response.ok) {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }

        const res = await response.json();
        dispatch(addVolume(res))
    } catch (error) {
        console.log('Error: ', error);
    }
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // }
    // return axios.get(`${baseUrl}`, { params: data }, config)
}

export const getBillForUser = async (data, token, dispatch) => {
    console.log("Running get bill api...")
    console.log(token)
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // }

    // console.log(config)
    // return axios.get(`${baseUrl}/bill`, { params: data }, config)
    try {
        const response = await fetch(`${baseUrl}/bill?userId=${data.userId}&year=${data.year}&month=${data.month}&date=${data.date}`, {
            method: 'get',
            headers: {
                Authorization: `${token}`
            }
        })

        if (!response.ok) {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }

        const res = await response.json();
        dispatch(addBill(res));
        return res;
    } catch (error) {
        console.log('Error: ', error);
    }
}