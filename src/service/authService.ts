import { getData, http } from "./http"
import type { User } from "./types"


export const pingAuth = (token?: string) => {
    console.log("hittting pinggggg")
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return http.get<User>("/v1/auth/me", { headers }).then(getData);
};

export const registerWithFirebase = (idToken: string, firstName: string, lastName: string) => {
    return http.post("/v1/auth/register", { idToken, firstName, lastName });
};

export const loginWithFirebase = (idToken: string) => {
    return http.post("/v1/auth/login", { idToken });
};