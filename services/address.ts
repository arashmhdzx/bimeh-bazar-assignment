import axiosInstance from "./axios.config";

interface AddressProps {
    id: string;
    name: string;
    details: string;
}
export const getAllAdresses = async (): Promise<AddressProps[]> => {
    try {
        const { data } = await axiosInstance.get(`/my-addresses`);
        return data;
    } catch (error) {
        throw error;
    }
}