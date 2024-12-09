import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { SupplierRequest } from '~/application/model/modelRequest/SupplierModelRequest';
const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'Supplier';
const apiSupplier = {
    getPagingSupplier: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(
            `/${controllerName}/${databaseName}/GetPaging?index=${props.index}&size=${props.size}`,
        );
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}`);
        return res;
    },
    getSupplierById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}/${id}`);
        return res;
    },
    createSupplier: async (axiosJWT: any, model: SupplierRequest) => {
        const res = await axiosJWT.post(`/${controllerName}`, model);
        return res;
    },
    deleteSupplier: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/${controllerName}/${id}`);
        return res;
    },
    updateSupplier: async (axiosJWT: any, model: SupplierRequest) => {
        const res = await axiosJWT.put(`/${controllerName}`, model);
        return res;
    },
};

export { apiSupplier };
