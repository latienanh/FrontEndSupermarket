import Customer from '~/domain/entities/supermarketEntities/Customer';

interface GetPagingCustomerResponseSuccess extends ResponseBase {
    listData: Customer[];
}
interface GetCountPagingCustomerResponseSuccess extends ResponseBase {
    data: number;
}
interface GetCustomerByIdResponseSuccess extends ResponseBase {
    data: Customer;
}
interface GetCustomerByIdResponseFailure extends ResponseBase {}
interface GetPagingCustomerResponseFailure extends ResponseBase {}

export {
    GetCountPagingCustomerResponseSuccess,
    GetCustomerByIdResponseFailure,
    GetCustomerByIdResponseSuccess,
    GetPagingCustomerResponseFailure,
    GetPagingCustomerResponseSuccess,
};
