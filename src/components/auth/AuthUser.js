import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, authLogout } from '../../stores/Auth'

export default function AuthUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        dispatch(login({
            user: user,
            token: token
        }))
        setToken(token);
        setUser(user);
        navigate('/');
    }

    const saveRefreshToken = (user, token) => {
        dispatch(login({
            user: user,
            token: token
        }))
        setToken(token);
        setUser(user);
    }

    const logout = () => {
        dispatch(authLogout)
        navigate('/login');
    }

    const http = axios.create({
        baseURL: "http://localhost:8080/",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    let refresh = false;

    http.interceptors.response.use(resp => resp, async error => {

        if (error.response.status === 403 && !refresh) {
            refresh = true;
            const response = await http.post('/api/User/Auth/refreshToken?username=' + user.userName);
            if (response.status === 200) {
                http.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
                saveRefreshToken(response.data.data.user, response.data.data.token);
                error.config.headers['Authorization'] = `Bearer ${response.data.data.token}`;
                return http(error.config);
            }
        }
        refresh = false;
        return error.response;
    });

    return {
        setToken: saveToken,
        token,
        user,
        http,
        getUser,
        getToken,
        logout
    }
}
