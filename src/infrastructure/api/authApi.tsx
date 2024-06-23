import { isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginRequest, SignupRequest } from '~/application/model/modelRequest/AuthModelRequest';
import { LoginResponseSuccess } from '~/application/model/modelResponse/AuthModelResponse';
import axiosClient from './axiosClient';

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
    refershToken: async (model: SignupRequest) => {
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
    logout: async () => {
        const res = await axiosClient.post(`/Auth/Logout`);
        return res;
    },
};

export { apiAuth };
