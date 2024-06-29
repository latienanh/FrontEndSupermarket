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
export interface AddCategoryParams {
    id?: string;
}

function AddCategory() {
    const param: AddCategoryParams = useParams();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const categoryState = useSelector((state: RootState) => state.category);
    const dispatch = useDispatch<AppDispatch>();

    const [categoryCreate, setCategoryCreate] = useState<CategoryRequest>({
        parentId: param.id,
        name: '',
        describe: '',
        image: null,
    });

    const [errors, setErrors] = useState<ErrorCategory>({});
    const navigate = useNavigate();

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!categoryCreate?.name) {
            handleError('Vui lòng nhập tên !', 'name');
            isValid = false;
        } else if (categoryCreate.name.length > 50) {
            handleError('Tên dưới 50 kí tự !', 'name');
            isValid = false;
        }
        if (!categoryCreate?.describe) {
            handleError('Vui lòng nhập mô tả !', 'describe');
            isValid = false;
        }
        if (isValid) {
            console.log(categoryCreate);
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            dispatch(CategoryService.fetchCreate(categoryCreate));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!categoryState.isLoading) {
            if (hasEditDataChanged) {
                if (!categoryState.isError && categoryState.dataCreate) {
                    toast.success(categoryState.dataCreate.message);
                    navigate(URL_APP.Categories);
                } else if (categoryState.isError && categoryState.dataCreate) {
                    toast.error(categoryState.dataCreate.message);
                }
            }
        }
    }, [categoryState.dataCreate]);
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setCategoryCreate((prevState) => ({ ...prevState, name: value }));
    };
    const handleChangeDescribe = (data: any) => {
        handleError('', 'describe');
        setCategoryCreate((prevState) => ({ ...prevState, describe: data }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setCategoryCreate((prevState) => ({ ...prevState, image: file }));
        }
    };
    const handleRemoveFile = () => {
        setCategoryCreate((prevState) => ({ ...prevState, image: null }));
    };

    return (
        <>
            {categoryState.isLoading && !categoryState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">Category</h2>
                        <h2 className="mt-30 page-title">{categoryCreate.parentId}</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="category.html">Category</a>
                            </li>
                            <li className="breadcrumb-item active">Add Category</li>
                        </ol>
                        <div className="row">
                            <div className="col-lg col-md-7 ">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>Add New Category</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="news-content-right pd-20">
                                            <div className="row">
                                                <InputCustome
                                                    Title="Tên"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-name"
                                                    onChange={handleChangeName}
                                                    Error={errors.name}
                                                    style="col-lg-12 mt-3 mb-3"
                                                />
                                                <EditorCustome
                                                    onChangeData={handleChangeDescribe}
                                                    Title="Mô tả"
                                                    Id="card-describe"
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
                                            Title="Thêm thể loại"
                                            BackgroundColor="#36ef84"
                                            HoverColor="#25a35a"
                                            onClick={() => {
                                                validate();
                                            }}
                                            Icon="fa-solid fa-plus"
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
// const AddCategory = () => {
//     return <></>;
// };
export default AddCategory;
