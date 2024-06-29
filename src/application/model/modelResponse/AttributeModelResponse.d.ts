import Attribute from '~/domain/entities/supermarketEntities/Attribute';

interface GetAttributesResponseSuccess extends ResponseBase {
    listData: Attribute[];
}
interface GetCountPagingAtriResponseSuccess extends ResponseBase {
    data: number;
}
interface GetAttributeByIdResponseSuccess extends ResponseBase {
    data: Attribute;
}
interface GetAttributeByIdResponseFailure extends ResponseBase {}
interface GetAttributesResponseFailure extends ResponseBase {}

export {
    GetAttributeByIdResponseFailure,
    GetAttributeByIdResponseSuccess,
    GetAttributesResponseSuccess,
    GetCountPagingAtriResponseSuccess,
    GetAttributesResponseFailure,
};
