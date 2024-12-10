import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import {
    UserCreateRequest,
    UserEditRequest,
    UserUpdateRequest,
} from '~/application/model/modelRequest/UserModelRequest';

const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'users';
const apiUser = {
    getPagingUser: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(
            `/${controllerName}/${databaseName}/GetPaging?index=${props.index}&size=${props.size}`,
        );
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}`);
        return res;
    },
    getUserById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}/${id}`);
        return res;
    },
    createUser: async (axiosJWT: any, model: UserCreateRequest) => {
        const formData = new FormData();
        formData.append('userName', model.userName);
        formData.append('password', model.password);
        formData.append('firstName', model.firstName);
        formData.append('lastName', model.lastName);
        formData.append('address', model.address);
        formData.append('email', model.email);
        if (model.avatar) {
            formData.append('image', model.avatar);
        }
        formData.append('phoneNumber', model.phoneNumber);
        for (let a = 0; a < model.roles.length; a++) {
            formData.append(`roles[${a}]`, model.roles[a]);
        }
        const res = await axiosJWT.post(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    deleteUser: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/${controllerName}/${id}`);
        return res;
    },
    updateUser: async (axiosJWT: any, model: UserUpdateRequest) => {
        const formData = new FormData();
        if (model.id) {
            formData.append('id', model.id);
        }
        formData.append('firstName', model.firstName);
        formData.append('lastName', model.lastName);
        formData.append('address', model.address);
        formData.append('email', model.email);
        if (model.avatar) {
            formData.append('image', model.avatar);
        }
        formData.append('phoneNumber', model.phoneNumber);
        if (model.roles) {
            for (let a = 0; a < model.roles.length; a++) {
                formData.append(`roles[${a}]`, model.roles[a]);
            }
        }
        const res = await axiosJWT.put(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    editUser: async (axiosJWT: any, model: UserEditRequest) => {
        const formData = new FormData();
        if (model.id) {
            formData.append('Id', model.id);
        }

        formData.append('FirstName', model.firstName);
        formData.append('LastName', model.lastName);
        formData.append('Email', model.email);
        if (model.avatar) {
            formData.append('Avatar', model.avatar);
        }
        formData.append('PhoneNumber', model.phoneNumber);

        const res = await axiosJWT.put(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
};

export { apiUser };
