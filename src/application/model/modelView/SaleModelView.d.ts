import Customer from '~/domain/entities/supermarketEntities/Customer';
import Employee from '~/domain/entities/supermarketEntities/Employee';

type InvoiceView = {
    customer: Customer | null;
    employee: Employee | null;
    paymentStatus: number;
    paymentMethod: string;
    invoiceDetails: InvoiceDetailView[];
};
type InvoiceDetailView = {
    productId: string;
    quantityProduct: number;
    name: string;
    price: number;
    quantity: number;
    unitPrice: number;
};
