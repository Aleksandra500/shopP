import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllProduct = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/product`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                products: res.data.products
            };
        } else {
            return {
                status: 'error',
                message: res.data?.message || 'Unknown error'
            };
        }
    } catch (err) {
        return {
            status: 'error',
            message: err.response?.data?.message || err.message
        };
    }
};