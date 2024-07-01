const apiSale = {
    Sale: async (axiosJwt: any, model: InvoiceRequest) => {
        const res = await axiosJwt.post(`/Sale`, model);
        return res;
    },
    GetAllInvoice: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/Sale`);
        return res;
    },
    GetSaleDateNow: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/Sale/SaleDateNow`);
        return res;
    },
    GetSaleChart: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/Sale/Chart`);
        return res;
    },
};

export { apiSale };
