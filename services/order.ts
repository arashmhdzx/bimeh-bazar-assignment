import axiosInstance from "./axios-config";

export const postNewOrder = async (reqData: Record<string, string>) => {
    try {
        const { data } = await axiosInstance.post("/order/completion/", reqData);
        return data;
    } catch (error) {
        throw error;
    }
}
