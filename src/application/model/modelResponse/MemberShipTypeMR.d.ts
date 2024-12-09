import { ResponseBase } from './ModelResponeseBase';
import MemberShipType from '~/domain/entities/supermarketEntities/MemberShipType';

export interface GetAllMSTResponseSuccess extends ResponseBase {
    listData: MemberShipType[];
}
export interface GetPagingMSTResponseSuccess extends ResponseBase {
    listData: {
        data: MemberShipType[];
        totalPage: number;
    };
}
export interface GetMSTByIdResponseSuccess extends ResponseBase {
    data: MemberShipType;
}
export interface GetMSTByIdResponseFailure extends ResponseBase {}
export interface GetAllMSTResponseFailure extends ResponseBase {}
export interface GetPagingMSTResponseFailure extends ResponseBase {}
