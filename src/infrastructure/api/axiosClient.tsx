import { UnknownAction } from '@reduxjs/toolkit';
import axios, { InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import { useContext } from 'react';
import { ReactReduxContext, ReactReduxContextValue } from 'react-redux';
import useAuthToken from '~/presentation/utils/getToken';
const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
    const persist = localStorage.getItem('persist:root');
    if (persist) {
        const persistJson = JSON.parse(persist);
        const authJson = JSON.parse(persistJson.auth);
        const accessToken = authJson.login.DataSuccess.data.accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
});
export default axiosClient;
