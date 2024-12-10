import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { ProductCreateRequest, ProductUpdateRequest } from '~/application/model/modelRequest/ProductModelResqest';
import { ModleCreateProduct } from '~/presentation/pages/entitySupermarket/product/AddProduct';
const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'Product';
const apiProduct = {
    getCountPaging: async (axiosJwt: any, size: number) => {
        const res = await axiosJwt.get(`/${controllerName}/${databaseName}/TotalPaging?size=${size}`);
        return res;
    },
    getPagingProduct: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(
            `/${controllerName}/${databaseName}/GetPaging?index=${props.index}&size=${props.size}`,
        );
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}`);
        return res;
    },
    getProductById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}/${id}`);
        return res;
    },
    createProduct: async (axiosJWT: any, model: ModleCreateProduct) => {
        console.log(model);
        const formData = new FormData();
        formData.append('barCode', model.productCreate.barCode);
        formData.append('name', model.productCreate.name);
        formData.append('slug', model.productCreate.slug);
        formData.append('describe', model.productCreate.describe);
        formData.append('defaultUnit', JSON.stringify(model.productCreate.defaultUnit));
        formData.append('additionalUnits', JSON.stringify(model.units));
        if (model.productCreate.image) {
            formData.append('image', model.productCreate.image);
        }
        // for (let a = 0; a < model.categoriesId.length; a++) {
        //     formData.append(`categoriesId[${a}]`, model.categoriesId[a]);
        // }
        formData.append(`categoriesId`, JSON.stringify(model.productCreate.categoriesId));
        if (model.productCreate.variants) {
            formData.append('variants', JSON.stringify(model.productCreate.variants));
            for (let a = 0; a < model.productCreate.variants.length; a++) {
                if (model.productCreate.variants[a].image) {
                    formData.append(`variantImages`, model.productCreate.variants[a].image as any);
                }
            }
            //     if (model.variants[a].image) {
            //         formData.append(`variantImages`, model.variants[a].image as any);
            //     }
            // for (let a = 0; a < model.variants.length; a++) {
            //     formData.append(`variants[${a}].barCode`, model.variants[a].barCode);
            //     formData.append(`variants[${a}].name`, model.variants[a].name);
            //     formData.append(`variants[${a}].slug`, model.variants[a].slug);
            //     formData.append(`variants[${a}].price`, model.variants[a].price.toString());
            //     formData.append(`variants[${a}].describe`, model.variants[a].describe);
            //     if (model.variants[a].image) {
            //         formData.append(`variantImages`, model.variants[a].image as any);
            //     }
            //     if (model.variants[a].variantValues) {
            //         for (let i = 0; i < model.variants[a].variantValues.length; i++) {
            //             formData.append(
            //                 `variants[${a}].variantValues[${i}].attributeId`,
            //                 model.variants[a].variantValues[i].attributeId,
            //             );
            //             formData.append(
            //                 `variants[${a}].variantValues[${i}].variantValue`,
            //                 model.variants[a].variantValues[i].variantValue,
            //             );
            //         }
            //     }
            // }
        }

        const res = await axiosJWT.post(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    deleteProduct: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/${controllerName}`, {
            data: {
                id: id,
            },
        });
        return res;
    },
    updateProduct: async (axiosJWT: any, model: ProductUpdateRequest) => {
        const formData = new FormData();
        if (model.id) {
            formData.append('Id', model.id);
            console.log('da co id', model.id);
        }
        formData.append('BarCode', model.barCode);
        formData.append('Name', model.name);
        formData.append('Slug', model.slug);
        formData.append('Describe', model.describe);
        formData.append('Price', model.price.toString());
        if (model.image) {
            formData.append('Image', model.image);
        }
        for (let a = 0; a < model.categoriesId.length; a++) {
            formData.append(`CategoriesId[${a}]`, model.categoriesId[a]);
        }
        const res = await axiosJWT.put(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
};

export { apiProduct };
