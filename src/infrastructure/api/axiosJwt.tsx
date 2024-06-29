import axios from 'axios';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import queryString from 'query-string';
import { RootState } from '~/application/redux/rootState';
import { fetchRefreshToken } from '~/application/redux/slide/AuthSlide';

export const createAxios = (dispatch: any, getState: any) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const newInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        paramsSerializer: (params) => queryString.stringify(params),
    });
    newInstance.interceptors.request.use(
        async (config) => {
            const model = getState().auth.login.DataSuccess?.data;
            let date = new Date();
            const decodeAc = jwtDecode(model.accessToken);
            if (decodeAc.exp && decodeAc.exp < date.getTime() / 1000) {
                const resultAction = await dispatch(await fetchRefreshToken(model)).unwrap();
                if (resultAction.data.accessToken) {
                    config.headers.Authorization = `Bearer ${resultAction.data.accessToken}`;
                    return config;
                }
            }
            config.headers.Authorization = `Bearer ${model.accessToken}`;
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    newInstance.interceptors.response.use((response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    });
    return newInstance;
};
