import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_SPRING_CHAT_URL;
export const httpClient = axios.create({
    baseURL: baseUrl,
    headers:{
        'Content-type': "application/json"
    }
})