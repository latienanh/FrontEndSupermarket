import { CategoryRequest } from '~/application/model/modelRequest/CategoryModelRequest';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';

//push{user}
const apiCategory = {
    getAll: async (axiosJwt: any) => {
        const res = await axiosJwt.get(`/Categories`);
        return res;
    },
    getCountPaging: async (axiosJwt: any, size: number) => {
        const res = await axiosJwt.get(`/Categories/TotalPaging?size=${size}`);
        return res;
    },
    getPagingCategory: async (axiosJwt: any, props: propsFetchPaging) => {
        const res = await axiosJwt.get(`/Categories/GetPaging?index=${props.index}&size=${props.size}`);
        return res;
    },
    getCategoryById: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.get(`/Categories/${id}`);
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
        const res = await axiosJWT.post(`/Categories`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
    deleteCategory: async (axiosJWT: any, id: string) => {
        const res = await axiosJWT.delete(`/Categories/${id}`);
        return res;
    },
    updateCategory: async (axiosJWT: any, id: string, model: CategoryRequest) => {
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
        const res = await axiosJWT.put(`/Categories/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    },
};

export { apiCategory };
