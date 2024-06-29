type InvoiceRequest = {
    employeeId: string;
    paymentStatus: number;
    paymentMethod: string;
    invoiceDetails: InvoiceDetailRequest[];
};
type InvoiceDetailRequest = {
    productId: string;
    quantity: number;
    unitPrice: number;
};
