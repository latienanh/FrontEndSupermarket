import Attribute from '~/domain/entities/supermarketEntities/Attribute';

interface GetAttributesResponseSuccess extends ResponseBase {
    listData: {
        data: Attribute[];
        totalPage: number;
    };
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
    GetAttributesResponseFailure,
};
