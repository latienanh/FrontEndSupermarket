import User from '~/domain/entities/supermarketEntities/User';
import axiosClient from './axiosClient';
import {
    UserCreateRequest,
    UserEditRequest,
    UserUpdateRequest,
} from '~/application/model/modelRequest/UserModelRequest';
const apiRole = {
    getAll: async () => {
        const res = await axiosClient.get(`/Role`);

        return res;
    },
    getRoleById: async (id: string) => {
        const res = await axiosClient.get(`/Role`, { params: { id } });
        return res.data;
    },
    createRole: async (model: UserCreateRequest) => {
        const res = await axiosClient.post(`/Role`, model);
        return res.data;
    },
    deleteRole: async (id: string) => {
        const res = await axiosClient.delete(`/Role/${id}`);
        return res;
    },
    updateRole: async (id: string, model: UserUpdateRequest | UserEditRequest) => {
        const res = await axiosClient.put(`/Role`, model, { params: { id } });
        return res.data;
    },
};

export { apiRole };
