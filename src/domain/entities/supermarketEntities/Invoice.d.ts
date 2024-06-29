export interface Invoice {
    employeeId: string;
    paymentStatus: number;
    paymentMethod: string;
    invoiceDetails: InvoiceDetail[];
}
