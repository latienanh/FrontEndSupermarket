import { CategoryRequest } from '~/application/model/modelRequest/CategoryModelRequest';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';

const databaseName = process.env.REACT_APP_DATABASE_NAME;
const controllerName = 'Categories';

const apiCategory = {
    getAll: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/${controllerName}/${databaseName}`);
        return res;
    },
    getCountPaging: async (axiosJwt: any, size: number) => {
        const res = await axiosJwt.get(`/${controllerName}/${databaseName}/TotalPaging?size=${size}`);
        return res;
    },
    getPagingCategory: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(
            `/${controllerName}/${databaseName}/GetPaging?index=${props.index}&size=${props.size}`,
        );
        return res;
    },
    getCategoryById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/${controllerName}/${databaseName}/${id}`);
        return res;
    },
    createCategory: async (axiosJWT: any, model: CategoryRequest) => {
        const formData = new FormData();
        if (model.parentId) {
            formData.append('ParentId', model.parentId);
        }

        formData.append('Name', model.name);
        formData.append('Describe', model.describe);
        if (model.image) {
            formData.append('Image', model.image);
        }
        console.log(formData);
        const res = await axiosJWT.post(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    deleteCategory: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/${controllerName}`, {
            data: {
                id: id,
            },
        });
        return res;
    },
    updateCategory: async (axiosJWT: any, model: CategoryRequest) => {
        const formData = new FormData();
        if (model.id) {
            formData.append('Id', model.id);
        }
        // if (model.parentId) {
        //     formData.append('ParentId', model.parentId);
        // }
        formData.append('Name', model.name);
        formData.append('Describe', model.describe);
        if (model.image) {
            formData.append('Image', model.image);
        }
        console.log(formData);
        const res = await axiosJWT.put(`/${controllerName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
};

export { apiCategory };
