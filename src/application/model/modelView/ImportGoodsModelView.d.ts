import Employee from '~/domain/entities/supermarketEntities/Employee';
import Supplier from '~/domain/entities/supermarketEntities/Supplier';

type StockInView = {
    // supplierId: string;
    supplier: Supplier | null;
    // employeeId: string;
    employee: Employee | null;
    note: string;
    stockInDetails: StockInDetailView[];
};
type StockInDetailView = {
    productId: string;
    quantityProduct: number;
    name: string;
    price: number;
    quantityReceived: number;
    unitPriceReceived: number;
};
