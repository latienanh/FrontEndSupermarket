import { Invoice } from '~/domain/entities/supermarketEntities/Invoice';

interface GetAllInvoiceSuccess extends ResponseBase {
    listData: Invoice[];
}
interface GetSaleDateNowResponseSuccess extends ResponseBase {
    data: SaleDateNow;
}
interface GetChartResponseSuccess extends ResponseBase {
    data: Data;
}

export interface Data {
    dailySaleData: DailySaleDaum[];
}

export interface DailySaleDaum {
    date: string;
    totalPrice: number;
    quantity: number;
}
export interface SaleDateNow {
    quantityInvoice: number;
    totalPriceNow: number;
}

export { GetAllInvoiceSuccess, GetSaleDateNowResponseSuccess, GetChartResponseSuccess };
