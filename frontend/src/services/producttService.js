import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const addProduct = async (product) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/product/addProduct`, product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

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
