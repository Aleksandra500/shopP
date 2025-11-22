import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getSingleProduct = async(productID) => {

    try {
        
        const res = await axios.get(`${BASE_URL}/api/product/singleProduct/${productID}`) 
       
       
        

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                product: res.data.product,
            };
        }
        return {
            status: res.data.status,
            message: res.data.message,
        };
       

    } catch (err) {
        return {
            status: err.response?.data?.err,
            message: err.response?.data?.message,
        };
    }
}