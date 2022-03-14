import React from "react"
import ReactDOM from "react-dom"
import axios from 'axios'
import { message } from 'antd';


axios.defaults.withCredentials = true
let requset = axios.create({
    // baseURL: 'http://localhost:3001',
    timeout: 5000,
});



// 添加请求拦截器
requset.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });


// 添加响应拦截器
requset.interceptors.response.use(
    (response) => {
        let res = response.data
        if (response.status === 200) {
            return res;
        }else {
            console.log(res)
        }
    },
    (error) => {
        message.error(`${error.message}`)
        return Promise.reject(error);
    });

export default requset