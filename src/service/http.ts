import axios, { type AxiosResponse } from "axios";

export const http = axios.create({
    baseURL: "https://api.projects.karandeep.in/drive-clone",
    withCredentials: true
});

export const getData = <T>(res: AxiosResponse<T>): T => {
    return res.data;
};
