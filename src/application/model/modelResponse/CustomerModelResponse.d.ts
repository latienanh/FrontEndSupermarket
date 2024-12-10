import Customer from '~/domain/entities/supermarketEntities/Customer';

interface GetPagingCustomerResponseSuccess extends ResponseBase {
    listData: {
        data: Customer[];
        totalPage: number;
    };
}
interface GetAllCustomerResponseSuccess extends ResponseBase {
    listData: Customer[];
}
interface GetAllCustomerResponseFailure extends ResponseBase {}
interface GetCustomerByIdResponseSuccess extends ResponseBase {
    data: Customer;
}
interface GetCustomerByIdResponseFailure extends ResponseBase {}
interface GetPagingCustomerResponseFailure extends ResponseBase {}

export {
    GetCustomerByIdResponseFailure,
    GetCustomerByIdResponseSuccess,
    GetPagingCustomerResponseFailure,
    GetPagingCustomerResponseSuccess,
    GetAllCustomerResponseSuccess,
    GetAllCustomerResponseFailure,
};
