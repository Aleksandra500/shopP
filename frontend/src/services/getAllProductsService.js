import axios from "axios";

export const getAllProduct = async() => {

    try {
        
        const res = await axios.get('/api/product') 
       
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                products: res.data.products

            };
        } 
      

    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
}
