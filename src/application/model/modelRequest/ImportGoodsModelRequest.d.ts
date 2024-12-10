type StockInRequest = {
    supplierId: string;
    employeeId: string;
    note: string;
    stockInDetails: StockInDetailRequest[];
};
type StockInDetailRequest = {
    productId: string;
    productUnitId: string;
    quantityReceived: number;
    unitPriceReceived: number;
};
