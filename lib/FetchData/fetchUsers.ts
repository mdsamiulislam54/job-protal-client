import { User } from "@/types/userTypes";
import api from "../api/axios"

export const FetchUsers = async (userData: User) => {
    const res = await api.post(`/create-user`, userData);
    return res.data;
}