import { isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    ForgotPassword,
    LoginRequest,
    RefreshToken,
    ResetPassword,
    SignupRequest,
} from '~/application/model/modelRequest/AuthModelRequest';
import { LoginResponseSuccess } from '~/application/model/modelResponse/AuthModelResponse';

const API_URL = process.env.REACT_APP_API_URL;

//push{user}
const apiAuth = {
    login: async (model: LoginRequest) => {
        const jsonData = JSON.stringify(model);
        const res = await axios.post(`${API_URL}/Auth/Login`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data: LoginResponseSuccess = res.data;
        return data;
    },
    sigup: async (model: SignupRequest) => {
        const formData = new FormData();
        formData.append('UserName', model.userName);
        formData.append('Password', model.password);
        formData.append('FirstName', model.firstName);
        formData.append('LastName', model.lastName);
        formData.append('Email', model.email);
        if (model.avatar) {
            formData.append('Avatar', model.avatar);
        }
        formData.append('PhoneNumber', model.phoneNumber);
        formData.append('ConfirmPassword', model.confilmPassword);

        const res = await axios.post(`${API_URL}/Auth/SignUp`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(res.data);
        return res.data;
    },
    refreshToken: async (model: RefreshToken) => {
        const jsonData = JSON.stringify(model);
        const res = await axios.post(`${API_URL}/Auth/Refresh`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    },
    forgotPassword: async (model: ForgotPassword) => {
        const jsonData = JSON.stringify(model);
        const res = await axios.post(`${API_URL}/Auth/ForgotPassword`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    },
    resetPassword: async (model: ResetPassword) => {
        const jsonData = JSON.stringify(model);
        const res = await axios.post(`${API_URL}/Auth/ResetPassword`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    },
    logout: async (axiosJWT: any) => {
        const res = await axiosJWT.post(`/Auth/Logout`);
        return res;
    },
};

export { apiAuth };
