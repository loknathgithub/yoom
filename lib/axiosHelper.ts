import axios from "axios";

export const baseUrl = process.env.SPRING_CHAT_URL || "http://localhost:8090";
export const httpClient = axios.create({
    baseURL: baseUrl,
    headers:{
        'Content-type': "application/json"
    }
})