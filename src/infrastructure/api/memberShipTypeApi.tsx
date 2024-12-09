import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { MemberShipTypeRequest } from '~/application/model/modelRequest/MemberShipTypeMR';
const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'MembershipTypes';
const apiMemberShipType = {
    getPagingMemberShipType: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(
            `/${controllerName}/${databaseName}/GetPaging?index=${props.index}&size=${props.size}`,
        );
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}`);
        return res;
    },
    getMemberShipTypeById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}/${id}`);
        return res;
    },
    createMemberShipType: async (axiosJWT: any, model: MemberShipTypeRequest) => {
        const res = await axiosJWT.post(`/${controllerName}`, model);
        return res;
    },
    deleteMemberShipType: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/${controllerName}/${id}`);
        return res;
    },
    updateMemberShipType: async (axiosJWT: any, model: MemberShipTypeRequest) => {
        const res = await axiosJWT.put(`/${controllerName}`, model);
        return res;
    },
};

export { apiMemberShipType };
