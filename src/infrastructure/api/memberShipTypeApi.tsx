import { MemberShipTypeRequest } from '~/application/model/modelRequest/MemberShipTypeMR';

const apiMemberShipType = {
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/MemberShipType`);
        return res;
    },
    getMemberShipTypeById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/MemberShipType/${id}`);
        return res;
    },
    createMemberShipType: async (axiosJWT: any, model: MemberShipTypeRequest) => {
        const res = await axiosJWT.post(`/MemberShipType`, model);
        return res;
    },
    deleteMemberShipType: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/MemberShipType/${id}`);
        return res;
    },
    updateMemberShipType: async (axiosJWT: any, id: string, model: MemberShipTypeRequest) => {
        const res = await axiosJWT.put(`/MemberShipType/${id}`, model);
        return res;
    },
};

export { apiMemberShipType };
