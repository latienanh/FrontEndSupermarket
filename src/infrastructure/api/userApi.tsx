import {
    UserCreateRequest,
    UserEditRequest,
    UserUpdateRequest,
} from '~/application/model/modelRequest/UserModelRequest';

const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'User';
const apiUser = {
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
        const res = await axiosJWT.post(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    deleteUser: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/${controllerName}`, {
            data: {
                id: id,
            },
        });
        return res;
    },
    updateUser: async (axiosJWT: any, model: UserUpdateRequest) => {
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
        if (model.roles) {
            for (let a = 0; a < model.roles.length; a++) {
                formData.append(`Roles[${a}]`, model.roles[a]);
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
