import { EmployeeRequest } from '~/application/model/modelRequest/EmployeeModelRequest';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';

const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'Employees';

const apiEmployee = {
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

        formData.append('firstName', model.firstName);
        formData.append('lastName', model.lastName);
        formData.append('address', model.address);
        formData.append('email', model.email);
        if (model.image) {
            formData.append('image', model.image);
        }
        formData.append('phoneNumber', model.phoneNumber);
        const res = await axiosJWT.post(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    deleteEmployee: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/${controllerName}/${id}`);
        return res;
    },
    updateEmployee: async (axiosJWT: any, model: EmployeeRequest) => {
        const formData = new FormData();
        if (model.id) {
            formData.append('id', model.id);
        }
        formData.append('firstName', model.firstName);
        formData.append('lastName', model.lastName);
        formData.append('address', model.address);
        formData.append('email', model.email);
        if (model.image) {
            formData.append('image', model.image);
        }
        formData.append('phoneNumber', model.phoneNumber);
        const res = await axiosJWT.put(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
};

export { apiEmployee };
