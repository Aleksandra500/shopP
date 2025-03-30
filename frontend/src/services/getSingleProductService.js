import axios from "axios";

export const getSingleProduct = async(productID) => {

    try {
        
        const res = await axios.get(`/api/product/singleProduct/${productID}`) 
       
       
        

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