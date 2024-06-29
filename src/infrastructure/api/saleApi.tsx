const apiSale = {
    Sale: async (axiosJwt: any, model: InvoiceRequest) => {
        const res = await axiosJwt.get(`/Sale`, model);
        return res;
    },
};

export { apiSale };
