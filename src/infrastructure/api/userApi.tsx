import User from '~/domain/entities/supermarketEntities/User';
import axiosClient from './axiosClient';
import {
    UserCreateRequest,
    UserEditRequest,
    UserUpdateRequest,
} from '~/application/model/modelRequest/UserModelRequest';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const apiUser = {
    getAll: async () => {
        const res = await axiosClient.get(`/User`);
        return res;
    },
    getUserById: async (id: string) => {
        const res = await axiosClient.get(`/User/${id}`);
        return res;
    },
    createUser: async (model: UserCreateRequest) => {
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
        for (let a = 0; a < model.roles.length; a++) {
            formData.append(`Roles[${a}]`, model.roles[a]);
        }
        const res = await axiosClient.post(`/User`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    deleteUser: async (id: string) => {
        const res = await axiosClient.delete(`/User/${id}`);
        return res;
    },
    updateUser: async (id: string, model: UserUpdateRequest) => {
        const formData = new FormData();
        formData.append('FirstName', model.firstName);
        formData.append('LastName', model.lastName);
        formData.append('Email', model.email);
        if (model.avatar) {
            formData.append('Avatar', model.avatar);
        }
        formData.append('PhoneNumber', model.phoneNumber);
        if (model.roles) {
            for (let a = 0; a < model.roles.length; a++) {
                formData.append(`Roles[${a}]`, model.roles[a]);
            }
        }
        const res = await axiosClient.put(`/User/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    editUser: async (id: string, model: UserEditRequest) => {
        const formData = new FormData();
        formData.append('FirstName', model.firstName);
        formData.append('LastName', model.lastName);
        formData.append('Email', model.email);
        if (model.avatar) {
            formData.append('Avatar', model.avatar);
        }
        formData.append('PhoneNumber', model.phoneNumber);

        const res = await axiosClient.put(`/User/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
};

export { apiUser };
