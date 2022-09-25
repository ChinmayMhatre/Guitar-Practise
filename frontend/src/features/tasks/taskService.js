import { useContext } from "react";
import TaskContext from "./TaskContext";
import {toast} from "react-toastify";
import axios from "axios";
const API_URL = '/api/tasks/';



const HandleAddTask = async ({title,duration,difficulty}) => {
    console.log("here");
    if(title==="" || duration==="" || difficulty===""){
        toast.error("Please fill all the fields");
        return;
    }
    try {
        const newtask = {
            title,
            duration,
            difficulty
        }

        console.log(newtask);
        // send post request to url along with the bearer token in the local storage
        const response = await axios.post(API_URL, newtask, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            }
        });
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

const getOneTask = async (id) => {
    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            }})

            console.log(id);
        response.data.forEach(task => {
            if(task._id===id){
                console.log(task);
                return task;
            }
        });
        }
        catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    const HandleEditTask = async (id, {title, duration, difficulty}) => {
        try {
            const newtask = {
                title,
                duration,
                difficulty
            }
            console.log(newtask);
            const response = await axios.put(`${API_URL}${id}`, newtask, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }


const taskService = {
    HandleAddTask,
    getOneTask,
    HandleEditTask
}

export default taskService;