import { MemberShipTypeRequest } from '~/application/model/modelRequest/MemberShipTypeMR';
const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'MemberShipType';
const apiMemberShipType = {
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
        const res = await axiosJWT.delete(`/${controllerName}`, {
            data: {
                id: id,
            },
        });
        return res;
    },
    updateMemberShipType: async (axiosJWT: any, model: MemberShipTypeRequest) => {
        const res = await axiosJWT.put(`/${controllerName}`, model);
        return res;
    },
};

export { apiMemberShipType };
