import User from '~/domain/entities/supermarketEntities/User';
import { ResponseBase } from './ModelResponeseBase';

export interface GetAllUserResponseSuccess extends ResponseBase {
    listData: User[];
}

export interface GetMultipleUsersResponseSuccess extends ResponseBase {
    listData: {
        data: User[];
        totalPage: number;
    };
}
export interface GetUserByIdResponseSuccess extends ResponseBase {
    data: User;
}
export interface GetUserByIdResponseFailure extends ResponseBase {}
export interface GetAllUserResponseFailure extends ResponseBase {}
