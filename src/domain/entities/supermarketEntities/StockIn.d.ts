import { StockInDetail } from './StockInDetail';

export interface StockIn {
    supplierId: string;
    employeeId: string;
    note: string;
    stockInDetails: StockInDetail[];
}
