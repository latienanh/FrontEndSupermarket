import Employee from '~/domain/entities/supermarketEntities/Employee';

interface GetMultipleEmployeeResponseSuccess extends ResponseBase {
    listData: Employee[];
}
interface GetCountPagingEmployeeResponseSuccess extends ResponseBase {
    data: number;
}
interface GetEmployeeByIdResponseSuccess extends ResponseBase {
    data: Employee;
}
interface GetEmployeeByIdResponseFailure extends ResponseBase {}
interface GetMultipleEmployeeResponseFailure extends ResponseBase {}

export {
    GetCountPagingEmployeeResponseSuccess,
    GetEmployeeByIdResponseFailure,
    GetEmployeeByIdResponseSuccess,
    GetMultipleEmployeeResponseFailure,
    GetMultipleEmployeeResponseSuccess,
};
