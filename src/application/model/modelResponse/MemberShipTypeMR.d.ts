import { ResponseBase } from './ModelResponeseBase';
import MemberShipType from '~/domain/entities/supermarketEntities/MemberShipType';

export interface GetAllMSTResponseSuccess extends ResponseBase {
    listData: MemberShipType[];
}
export interface GetMSTByIdResponseSuccess extends ResponseBase {
    data: MemberShipType;
}
export interface GetMSTByIdResponseFailure extends ResponseBase {}
export interface GetAllMSTResponseFailure extends ResponseBase {}
