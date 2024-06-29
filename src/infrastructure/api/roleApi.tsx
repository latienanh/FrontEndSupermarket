const apiRole = {
    getAll: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/Role`);

        return res;
    },
    // getRoleById: async (axiosJwt: any, id: string) => {
    //     const res = await axiosJwt.get(`/Role`, { params: { id } });
    //     return res.data;
    // },
    // createRole: async (axiosJwt: any, model: UserCreateRequest) => {
    //     const res = await axiosJwt.post(`/Role`, model);
    //     return res.data;
    // },
    // deleteRole: async (axiosJwt: any, id: string) => {
    //     const res = await axiosJwt.delete(`/Role/${id}`);
    //     return res;
    // },
    // updateRole: async (axiosJwt: any, id: string, model: UserUpdateRequest | UserEditRequest) => {
    //     const res = await axiosJwt.put(`/Role`, model, { params: { id } });
    //     return res.data;
    // },
};

export { apiRole };
