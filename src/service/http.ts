import axios, { type AxiosResponse } from "axios";

export const http = axios.create({
    baseURL: "http://localhost:8080/drive-clone",
});

export const getData = <T>(res: AxiosResponse<T>): T => {
    return res.data;
};
