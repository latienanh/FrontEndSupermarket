import Supplier from '~/domain/entities/supermarketEntities/Supplier';

interface GetMultipleSupplierResponseSuccess extends ResponseBase {
    listData: {
        data: Supplier[];
        totalPage: number;
    };
}
interface GetAllSupplierResponseSuccess extends ResponseBase {
    listData: Supplier[];
}
interface GetAllSupplierResponseFailure extends ResponseBase {}
interface GetSupplierByIdResponseSuccess extends ResponseBase {
    data: Supplier;
}

interface GetSupplierByIdResponseFailure extends ResponseBase {}
interface GetMultipleSupplierResponseFailure extends ResponseBase {}

export {
    GetMultipleSupplierResponseFailure,
    GetMultipleSupplierResponseSuccess,
    GetSupplierByIdResponseFailure,
    GetSupplierByIdResponseSuccess,
    GetAllSupplierResponseFailure,
    GetAllSupplierResponseSuccess,
};
