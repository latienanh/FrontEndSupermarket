import { Role } from '~/domain/entities/supermarketEntities/Role';

export interface GetAllRoleResponseSuccess extends ResponseBase {
    listData: Role[];
}
export interface GetAllRoleResponseFailure extends ResponseBase {}
