import { AttributeRequest } from '~/application/model/modelRequest/AttributeModelRequest';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';

const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'Attribute';
const apiAttribute = {
    getPagingAttribute: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(
            `/${controllerName}/${databaseName}/GetPaging?index=${props.index}&size=${props.size}`,
        );
        console.log(res);
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}`);
        return res;
    },
    getAttributeById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}/${id}`);
        return res;
    },
    createAttribute: async (axiosJWT: any, model: AttributeRequest) => {
        const res = await axiosJWT.post(`/${controllerName}`, model);
        return res;
    },
    deleteAttribute: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/${controllerName}/${id}`);
        return res;
    },
    updateAttribute: async (axiosJWT: any, model: AttributeRequest) => {
        const res = await axiosJWT.put(`/${controllerName}`, model);
        return res;
    },
};

export { apiAttribute };
