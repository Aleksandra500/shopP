import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const deleteSingleProduct = async ({productID, productImage}) => {
    try {
        const res = await axios.delete(`${BASE_URL}/api/product/deleteProduct/${productID}/${productImage}`);
    
        
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
        return {
            status: res.data.status,
            message: res.data.message,
        };
    } catch (err) {
        

        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};