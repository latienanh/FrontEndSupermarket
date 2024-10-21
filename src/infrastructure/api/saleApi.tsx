const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'Sale';
const apiSale = {
    Sale: async (axiosJwt: any, model: InvoiceRequest) => {
        const res = await axiosJwt.post(`/${controllerName}`, model);
        return res;
    },
    GetAllInvoice: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/${controllerName}/${databaseName}`);
        return res;
    },
    GetSaleDateNow: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/${controllerName}/${databaseName}/SaleDateNow`);
        return res;
    },
    GetSaleChart: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/${controllerName}/${databaseName}/Chart`);
        console.log('da goi api chart');
        return res;
    },
};

export { apiSale };
