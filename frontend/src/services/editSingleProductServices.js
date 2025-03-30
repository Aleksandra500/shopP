import axios from "axios";

export const editSingleProduct = async (productData) => {
    try {
        const res = await axios.put('/api/product/editProduct', productData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
       
        

        if (res.status === 200 && res.data.status === "success") {
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
            status: err.response?.data?.err?.status,
            message: err.response?.data?.message,
        };
    }
};