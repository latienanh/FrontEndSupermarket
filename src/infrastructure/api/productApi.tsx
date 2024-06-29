import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { ProductCreateRequest, ProductUpdateRequest } from '~/application/model/modelRequest/ProductModelResqest';

const apiProduct = {
    getCountPaging: async (axiosJwt: any, size: number) => {
        const res = await axiosJwt.get(`/Product/TotalPaging?size=${size}`);
        return res;
    },
    getPagingProduct: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(`/Product/GetPaging?index=${props.index}&size=${props.size}`);
        return res;
    },
    getAll: async (axiosJWT: any) => {
        const res = await axiosJWT.get(`/Product`);
        return res;
    },
    getProductById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/Product/${id}`);
        return res;
    },
    createProduct: async (axiosJWT: any, model: ProductCreateRequest) => {
        const formData = new FormData();
        formData.append('BarCode', model.barCode);
        formData.append('Name', model.name);
        formData.append('Slug', model.slug);
        formData.append('Price', model.price.toString());
        formData.append('Describe', model.describe);
        if (model.image) {
            formData.append('Image', model.image);
        }
        for (let a = 0; a < model.categoriesId.length; a++) {
            formData.append(`CategoriesId[${a}]`, model.categoriesId[a]);
        }
        if (model.variants) {
            for (let a = 0; a < model.variants.length; a++) {
                formData.append(`Variants[${a}].BarCode`, model.variants[a].barCode);
                formData.append(`Variants[${a}].Name`, model.variants[a].name);
                formData.append(`Variants[${a}].Slug`, model.variants[a].slug);
                formData.append(`Variants[${a}].Price`, model.variants[a].price.toString());
                formData.append(`Variants[${a}].Describe`, model.variants[a].describe);
                if (model.variants[a].image) {
                    formData.append(`Variants[${a}].Image`, model.variants[a].image as any);
                }
                if (model.variants[a].variantValues) {
                    for (let i = 0; i < model.variants[a].variantValues.length; i++) {
                        formData.append(
                            `Variants[${a}].VariantValues[${i}].AttributeId`,
                            model.variants[a].variantValues[i].attributeId,
                        );
                        formData.append(
                            `Variants[${a}].VariantValues[${i}].VariantValue`,
                            model.variants[a].variantValues[i].variantValue,
                        );
                    }
                }
            }
        }

        const res = await axiosJWT.post(`/Product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    deleteProduct: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/Product/${id}`);
        return res;
    },
    updateProduct: async (axiosJWT: any, id: string, model: ProductUpdateRequest) => {
        const formData = new FormData();
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
        const res = await axiosJWT.put(`/Product/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
};

export { apiProduct };
