const apiImportGoods = {
    ImportGoods: async (axiosJwt: any, model: StockInRequest) => {
        const res = await axiosJwt.post(`/ImportGoods`, model);
        return res;
    },
};

export { apiImportGoods };
