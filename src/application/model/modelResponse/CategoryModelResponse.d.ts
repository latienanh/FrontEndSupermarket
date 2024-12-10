import Categories from '~/domain/entities/supermarketEntities/Category';
import Category from '~/domain/entities/supermarketEntities/Category';

interface GetMultipleCategoriesResponseSuccess extends ResponseBase {
    listData: {
        data: Categories[];
        totalPage: number;
    };
}

interface GetAllCategoriesResponseSuccess extends ResponseBase {
    listData: Categories[];
}
interface GetCategoryByIdResponseSuccess extends ResponseBase {
    data: Category;
}
interface GetCategoryByIdResponseFailure extends ResponseBase {}
interface GetMultipleCategoriesResponseFailure extends ResponseBase {}
interface GetAllCategoriesResponseFailure extends ResponseBase {
    listData: Categories[];
}
export {
    GetCategoryByIdResponseFailure,
    GetCategoryByIdResponseSuccess,
    GetMultipleCategoriesResponseSuccess,
    GetMultipleCategoriesResponseFailure,
    GetAllCategoriesResponseFailure,
    GetAllCategoriesResponseSuccess,
};
