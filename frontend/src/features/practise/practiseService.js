import axios from "axios";


const API_URL = "/api/practise/";

const getPractise = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                }`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

// add practise to the database

const addPractise = async (duration) => {
    try {
        const response = await axios.post(
            API_URL,
            { duration },
            {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                    }`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

const practiseService = {
    getPractise,
    addPractise,
};

export default practiseService;

