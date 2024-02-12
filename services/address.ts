import AddressProps from "@/types/address";
import axiosInstance from "./axios-config";

export const getAllAdresses = async (): Promise<AddressProps[]> => {
    try {
        const { data } = await axiosInstance.get(`/my-addresses/`);
        return data;
    } catch (error) {
        throw error;
    }
}