import axios, { type AxiosResponse } from "axios";

export const http = axios.create({
    baseURL: "https://drive-0x45.netlify.app/api",
    withCredentials: true
});

export const getData = <T>(res: AxiosResponse<T>): T => {
    return res.data;
};
