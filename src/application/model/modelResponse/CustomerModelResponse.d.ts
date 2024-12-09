import Customer from '~/domain/entities/supermarketEntities/Customer';

interface GetPagingCustomerResponseSuccess extends ResponseBase {
    listData: {
        data: Customer[];
        totalPage: number;
    };
}

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
};
