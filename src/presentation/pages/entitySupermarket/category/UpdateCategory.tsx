import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorCategory } from '~/application/model/modelErrorRequest/ErrorEntity';
import { CategoryRequest } from '~/application/model/modelRequest/CategoryModelRequest';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { CategoryService } from '~/application/redux/slide/CategorySlide';
import { URL_APP } from '~/presentation/router/Link';
import { LoadingAuth } from '../../loading';
import { ButtonCustome, EditorCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';

function UpdateCategory() {
    const { id } = useParams<{ id: string }>();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const categoryState = useSelector((state: RootState) => state.category);
    const dispatch = useDispatch<AppDispatch>();

    const [categoryUpdate, setCategoryUpdate] = useState<CategoryRequest>({
        id: id,
        parentId: null,
        name: '',
        describe: '',
        image: null,
    });
    const [errors, setErrors] = useState<ErrorCategory>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(CategoryService.fetchGetById(id));
        }
    }, []);
    useEffect(() => {
        setCategoryUpdate((prevState) => ({
            ...prevState,
            parentId: categoryState.dataGetCategoryById.DataSuccess?.data.parentId || null,
            name: categoryState.dataGetCategoryById.DataSuccess?.data.name || '',
            describe: categoryState.dataGetCategoryById.DataSuccess?.data.describe || '',
            image: null,
        }));
    }, [categoryState.dataGetCategoryById]);

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!categoryUpdate?.name) {
            handleError('Vui lòng nhập tên !', 'name');
            isValid = false;
        } else if (categoryUpdate.name.length > 50) {
            handleError('Tên dưới 50 kí tự !', 'name');
            isValid = false;
        }
        if (!categoryUpdate?.describe) {
            handleError('Vui lòng nhập mô tả !', 'describe');
            isValid = false;
        }
        if (isValid) {
            console.log(categoryUpdate);
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            if (id != undefined) {
                const payload = {
                    id: id,
                    model: categoryUpdate,
                };
                dispatch(CategoryService.fetchUpdate(payload));
                setHasEditDataChanged(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!categoryState.isLoading) {
            if (hasEditDataChanged) {
                if (!categoryState.isError && categoryState.dataUpdate) {
                    toast.success(categoryState.dataUpdate.message);
                    navigate(URL_APP.Categories);
                } else if (categoryState.isError && categoryState.dataUpdate) {
                    toast.error(categoryState.dataUpdate.message);
                }
            }
        }
    }, [categoryState.dataUpdate]);
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setCategoryUpdate((prevState) => ({ ...prevState, name: value }));
    };
    const handleChangeDescribe = (data: string) => {
        handleError('', 'describe');
        setCategoryUpdate((prevState) => ({ ...prevState, describe: data }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setCategoryUpdate((prevState) => ({ ...prevState, image: file }));
        }
    };
    const handleRemoveFile = () => {
        setCategoryUpdate((prevState) => ({ ...prevState, image: null }));
    };

    return (
        <>
            {categoryState.isLoading && !categoryState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">User</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="category.html">User</a>
                            </li>
                            <li className="breadcrumb-item active">Add User</li>
                        </ol>
                        <div className="row">
                            <div className="col-lg col-md-7 ">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>Add New User</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="news-content-right pd-20">
                                            <div className="row">
                                                <InputCustome
                                                    Title="Tên"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-name"
                                                    Value={categoryUpdate.name}
                                                    onChange={handleChangeName}
                                                    Error={errors.name}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <EditorCustome
                                                    onChangeData={handleChangeDescribe}
                                                    Title="Mô tả"
                                                    Id="card-describe"
                                                    Value={categoryUpdate.describe}
                                                    Error={errors.describe}
                                                />

                                                <InputImageCustome
                                                    Title="Ảnh"
                                                    onChangeFile={handleFileChange}
                                                    removeFile={handleRemoveFile}
                                                    style="col-lg-12 mt-3 mb-3"
                                                />
                                            </div>
                                        </div>
                                        <ButtonCustome
                                            Title="Sửa thể loại"
                                            BackgroundColor="#3caffb"
                                            HoverColor="#2a7aaf"
                                            onClick={() => {
                                                validate();
                                            }}
                                            Icon=" fa-solid fa-pen-to-square"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}
export default UpdateCategory;
