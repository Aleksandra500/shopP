import axios from 'axios';

export const register = async (user) => {
    try {
        const res = await axios.post('/api/user/register', user);

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
        return {
            status: res.data.error.status,
            message: res.data.message,
        };
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};

export const login = async (user) => {
    try {
        const res = await axios.post('/api/user/login', user);
      
        
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
                user: res.data.user,
                token: res.data.token
             
            };
        }
        return {
            status: res.data.status,
            message: res.data.message,
            user: res.data.user,
            token: res.data.token
         
        };
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};