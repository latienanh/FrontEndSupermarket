import Customer from './Customer';
import Employee from './Employee';
import InvoiceDetail from './InvoiceDetail';

export interface Invoice {
    customerId?: string;
    employeeId: string;
    invoiceDate: string;
    totalPrice: number;
    paymentStatus: number;
    paymentMethod: string;
    customer?: Customer;
    employee: Employee;
    invoiceDetails: InvoiceDetail[];
    id: string;
    createBy: string;
    createTime: string;
}
