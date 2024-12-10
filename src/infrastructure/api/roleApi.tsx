const apiRole = {
    getAll: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/users/sql/role`);

        return res;
    },
};

export { apiRole };
