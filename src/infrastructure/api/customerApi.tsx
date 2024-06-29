import { CustomerRequest } from '~/application/model/modelRequest/CustomerModelRequest';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';

const apiCustomer = {
    getCountPaging: async (axiosJwt: any, size: number) => {
        const res = await axiosJwt.get(`/Customer/TotalPaging?size=${size}`);
        return res;
    },
    getPagingCustomer: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(`/Customer/GetPaging?index=${props.index}&size=${props.size}`);
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/Customer`);
        return res;
    },
    getCustomerById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/Customer/${id}`);
        return res;
    },
    createCustomer: async (axiosJWT: any, model: CustomerRequest) => {
        const res = await axiosJWT.post(`/Customer`, model);
        return res;
    },
    deleteCustomer: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/Customer/${id}`);
        return res;
    },
    updateCustomer: async (axiosJWT: any, id: string, model: CustomerRequest) => {
        const res = await axiosJWT.put(`/Customer/${id}`, model);
        return res;
    },
};

export { apiCustomer };
