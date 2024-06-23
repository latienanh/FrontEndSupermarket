import User from '~/domain/entities/supermarketEntities/User';
import { ResponseBase } from './ModelResponeseBase';

export interface GetAllResponseSuccess extends ResponseBase {
    listData: User[];
}
export interface GetUserByIdResponseSuccess extends ResponseBase {
    data: User;
}
export interface GetUserByIdResponseFailure extends ResponseBase {}
export interface GetAllResponseFailure extends ResponseBase {}
