import axios from 'axios';
const API_URL = '/api/users/';

// Register user

const register = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error
    }
        
}

const login = async (userData) => {
    try {
        const response = await axios.post(API_URL+"login", userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error
    }
        
}

const authService = {
    register,
    login
};

export default authService;