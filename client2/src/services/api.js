import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:7000",
});

export const createSession = async (email, password) => {
    return api.post("/fazerlogin", {email, password});
};