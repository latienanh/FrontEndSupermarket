import { AttributeRequest } from '~/application/model/modelRequest/AttributeModelRequest';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';

const apiAttribute = {
    getCountPaging: async (axiosJwt: any, size: number) => {
        const res = await axiosJwt.get(`/Attribute/TotalPaging?size=${size}`);
        return res;
    },
    getPagingAttribute: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(`/Attribute/GetPaging?index=${props.index}&size=${props.size}`);
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/Attribute`);
        return res;
    },
    getAttributeById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/Attribute/${id}`);
        return res;
    },
    createAttribute: async (axiosJWT: any, model: AttributeRequest) => {
        const res = await axiosJWT.post(`/Attribute`, model);
        return res;
    },
    deleteAttribute: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/Attribute/${id}`);
        return res;
    },
    updateAttribute: async (axiosJWT: any, id: string, model: AttributeRequest) => {
        const res = await axiosJWT.put(`/Attribute/${id}`, model);
        return res;
    },
};

export { apiAttribute };
