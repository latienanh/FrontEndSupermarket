import { Product } from '~/domain/entities/supermarketEntities/Product';

interface GetProductsResponseSuccess extends ResponseBase {
    listData: Product[];
}
interface GetCountPagingAtriResponseSuccess extends ResponseBase {
    data: number;
}
interface GetProductByIdResponseSuccess extends ResponseBase {
    data: Product;
}
interface GetProductByIdResponseFailure extends ResponseBase {}
interface GetProductsResponseFailure extends ResponseBase {}

export {
    GetProductByIdResponseFailure,
    GetProductByIdResponseSuccess,
    GetProductsResponseSuccess,
    GetCountPagingAtriResponseSuccess,
    GetProductsResponseFailure,
};
