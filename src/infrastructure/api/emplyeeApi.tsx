import { EmployeeRequest } from '~/application/model/modelRequest/EmployeeModelRequest';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';

const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'Employee';

const apiEmployee = {
    getCountPaging: async (axiosJwt: any, size: number) => {
        const res = await axiosJwt.get(`/${controllerName}/${databaseName}/TotalPaging?size=${size}`);
        return res;
    },
    getPagingEmployee: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(
            `/${controllerName}/${databaseName}/GetPaging?index=${props.index}&size=${props.size}`,
        );
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}`);
        return res;
    },
    getEmployeeById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}/${id}`);
        return res;
    },
    createEmployee: async (axiosJWT: any, model: EmployeeRequest) => {
        const formData = new FormData();

        formData.append('FirstName', model.firstName);
        formData.append('LastName', model.lastName);
        formData.append('Address', model.address);
        formData.append('Email', model.email);
        if (model.image) {
            formData.append('Image', model.image);
        }
        formData.append('PhoneNumber', model.phoneNumber);
        const res = await axiosJWT.post(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    deleteEmployee: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/${controllerName}`, {
            data: {
                id: id,
            },
        });
        return res;
    },
    updateEmployee: async (axiosJWT: any, model: EmployeeRequest) => {
        const formData = new FormData();
        if (model.id) {
            formData.append('Id', model.id);
        }
        formData.append('FirstName', model.firstName);
        formData.append('LastName', model.lastName);
        formData.append('Address', model.address);
        formData.append('Email', model.email);
        if (model.image) {
            formData.append('Image', model.image);
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

export { apiEmployee };
