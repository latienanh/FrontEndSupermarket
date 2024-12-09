import { Product } from '~/domain/entities/supermarketEntities/Product';

interface GetProductsResponseSuccess extends ResponseBase {
    listData: {
        data: Product[];
        totalPage: number;
    };
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
    GetProductsResponseFailure,
};
