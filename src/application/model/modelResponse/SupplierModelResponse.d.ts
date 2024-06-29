import Supplier from '~/domain/entities/supermarketEntities/Supplier';

interface GetMultipleSupplierResponseSuccess extends ResponseBase {
    listData: Supplier[];
}
interface GetCountPagingSupplierResponseSuccess extends ResponseBase {
    data: number;
}
interface GetSupplierByIdResponseSuccess extends ResponseBase {
    data: Supplier;
}
interface GetSupplierByIdResponseFailure extends ResponseBase {}
interface GetMultipleSupplierResponseFailure extends ResponseBase {}

export {
    GetCountPagingSupplierResponseSuccess,
    GetSupplierByIdResponseFailure,
    GetSupplierByIdResponseSuccess,
    GetMultipleSupplierResponseFailure,
    GetMultipleSupplierResponseSuccess,
};
