import { AxiosError } from "axios";
import { httpClient } from "./axiosHelper"
import { toast } from "sonner";

export const createRoomUtils = async (roomId: string) => {
    try {
        const response = await httpClient.post(`/api/v1/rooms/create/${roomId}`)
        toast.success("Room created successfully");
        return response.data;
    } catch (err) {
        const error = err as AxiosError;
        if(error.response?.status === 400){
            toast.error("Room id already exists");
            return;
        }
        console.error("Error occured while creating room:", error);
    }
}

export const joinChatUtils = async (roomId: string) =>{
    try {
        const response = await httpClient.get(`/api/v1/rooms/find/${roomId}`)
        return response.data;
    } catch (error) {
        console.error("Error occurred while joining room: ", error);
    }
}