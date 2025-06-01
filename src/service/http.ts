import axios, { type AxiosResponse } from "axios";

export const http = axios.create({
    baseURL: "https://13.62.37.89/drive-clone",
});

export const getData = <T>(res: AxiosResponse<T>) => {
    return res.data;
};
