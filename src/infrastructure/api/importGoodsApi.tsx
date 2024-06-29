const apiImportGoods = {
    ImportGoods: async (axiosJwt: any, model: StockInRequest) => {
        const res = await axiosJwt.get(`/ImportGoods`, model);
        return res;
    },
};

export { apiImportGoods };
