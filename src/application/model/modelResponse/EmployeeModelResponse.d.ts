import Employee from '~/domain/entities/supermarketEntities/Employee';

interface GetMultipleEmployeeResponseSuccess extends ResponseBase {
    listData: {
        data: Employee[];
        totalPage: number;
    };
}
interface GetAllEmployeeResponseSuccess extends ResponseBase {
    listData: Employee[];
}
interface GetAllEmployeeResponseFailure extends ResponseBase {}

interface GetEmployeeByIdResponseSuccess extends ResponseBase {
    data: Employee;
}
interface GetEmployeeByIdResponseFailure extends ResponseBase {}
interface GetMultipleEmployeeResponseFailure extends ResponseBase {}

export {
    GetEmployeeByIdResponseFailure,
    GetEmployeeByIdResponseSuccess,
    GetMultipleEmployeeResponseFailure,
    GetMultipleEmployeeResponseSuccess,
    GetAllEmployeeResponseSuccess,
    GetAllEmployeeResponseFailure,
};
