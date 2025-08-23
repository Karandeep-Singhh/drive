import axios, { type AxiosResponse } from "axios";

const getBaseURL = (): string => {
    // For production, use environment variable or fallback to production URL
    if (process.env.NODE_ENV === 'production') {
        return process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.projects.karandeep.in/drive-clone";
    }
    // For development, use environment variable or fallback to localhost
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/drive-clone";
};

export const http = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true
});

export const getData = <T>(res: AxiosResponse<T>): T => {
    return res.data;
};
