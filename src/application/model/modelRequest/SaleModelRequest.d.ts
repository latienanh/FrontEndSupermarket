type InvoiceRequest = {
    employeeId: string;
    customerId: string | null;
    paymentStatus: number;
    paymentMethod: string;
    invoiceDetails: InvoiceDetailRequest[];
};
type InvoiceDetailRequest = {
    productId: string;
    quantity: number;
    unitPrice: number;
};
