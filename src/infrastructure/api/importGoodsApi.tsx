const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'ImportGoods';
const apiImportGoods = {
    ImportGoods: async (axiosJwt: any, model: StockInRequest) => {
        const res = await axiosJwt.post(`/${controllerName}`, model);
        return res;
    },
};

export { apiImportGoods };
