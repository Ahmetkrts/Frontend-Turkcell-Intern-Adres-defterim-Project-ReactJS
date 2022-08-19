import axios from "axios"
import { useSelector } from 'react-redux';

export const deleteUser = (userId) => {

    return axios.delete("/api/User/delete", {
        data: {
            userId: parseInt(userId)
        }
    });

}

//User
export const createUser = (body) => {
    return axios.post("/api/User/Auth/register", body);
}

export const loginUser = (body) => {
    return axios.post("/api/User/Auth/login", body);
}



