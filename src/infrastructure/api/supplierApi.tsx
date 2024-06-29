import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { SupplierRequest } from '~/application/model/modelRequest/SupplierModelRequest';
const apiSupplier = {
    getCountPaging: async (axiosJwt: any, size: number) => {
        const res = await axiosJwt.get(`/Supplier/TotalPaging?size=${size}`);
        return res;
    },
    getPagingSupplier: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(`/Supplier/GetPaging?index=${props.index}&size=${props.size}`);
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/Supplier`);
        return res;
    },
    getSupplierById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/Supplier/${id}`);
        return res;
    },
    createSupplier: async (axiosJWT: any, model: SupplierRequest) => {
        const res = await axiosJWT.post(`/Supplier`, model);
        return res;
    },
    deleteSupplier: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/Supplier/${id}`);
        return res;
    },
    updateSupplier: async (axiosJWT: any, id: string, model: SupplierRequest) => {
        const res = await axiosJWT.put(`/Supplier/${id}`, model);
        return res;
    },
};

export { apiSupplier };
