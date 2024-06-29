import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { ErrorProductUpdate } from '~/application/model/modelErrorRequest/ErrorEntity';
import { ProductUpdateRequest } from '~/application/model/modelRequest/ProductModelResqest';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { CategoryService } from '~/application/redux/slide/CategorySlide';
import { ProductService } from '~/application/redux/slide/ProductSlide';
import { ButtonCustome, EditorCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';

function SalePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const productState = useSelector((state: RootState) => state.product);
    const categoryState = useSelector((state: RootState) => state.category);
    const dispatch = useDispatch<AppDispatch>();
    const [productUpdate, setpPoductUpdate] = useState<ProductUpdateRequest>({
        barCode: '',
        name: '',
        slug: '',
        image: null,
        price: 0,
        describe: '',
        categoriesId: [],
    });
    const [errors, setErrors] = useState<ErrorProductUpdate>({});

    useEffect(() => {
        dispatch(CategoryService.fetchGetAll());
        if (id !== undefined) {
            dispatch(ProductService.fetchGetById(id));
        }
    }, []);
    useEffect(() => {
        setpPoductUpdate((prevState) => ({
            ...prevState,
            barCode: productState.dataGetProductById.DataSuccess?.data.barCode || '',
            name: productState.dataGetProductById.DataSuccess?.data.name || '',
            slug: productState.dataGetProductById.DataSuccess?.data.slug || '',
            image: null,
            describe: productState.dataGetProductById.DataSuccess?.data.describe || '',
            categoriesId: productState.dataGetProductById.DataSuccess?.data?.categories
                ? Object.values(productState.dataGetProductById.DataSuccess.data.categories).map(
                      (categpry) => categpry.id,
                  )
                : [],
        }));
    }, [productState.dataGetProductById]);

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!productUpdate?.barCode) {
            handleError('Vui lòng nhập barCode !', 'barCode');
            isValid = false;
        } else if (productUpdate.barCode.length < 5 && productUpdate.barCode.length > 15) {
            handleError('barCode Name phải trên 5 và ít hơn 15 kí tự !', 'barCode');
            isValid = false;
        }
        if (!productUpdate?.name) {
            handleError('Vui lòng nhập tên sản phẩm !', 'name');
            isValid = false;
        } else if (productUpdate.name.length < 5 && productUpdate.name.length > 50) {
            handleError('Tên phải trên 5 và ít hơn 50 kí tự !', 'name');
            isValid = false;
        }
        if (!productUpdate?.describe) {
            handleError('Chưa nhập mô tả !', 'describe');
            isValid = false;
        }
        if (!productUpdate?.slug) {
            handleError('Chưa nhập đường dẫn !', 'slug');
            isValid = false;
        }
        if (!productUpdate.categoriesId || productUpdate.categoriesId.length === 0) {
            handleError('Chưa chọn Category!', 'categoriesId');
            isValid = false;
        }
        if (isValid) {
            // console.log(productUpdate);
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            if (id !== undefined) {
                const payload = {
                    id: id,
                    model: productUpdate,
                };
                dispatch(ProductService.fetchUpdate(payload));
                setHasEditDataChanged(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!productState.isLoading) {
            if (!productState.isError && productState.dataUpdate) {
                if (hasEditDataChanged) {
                    toast.success(productState.dataUpdate.message);
                    navigate(URL_APP.Products);
                }
            } else if (productState.isError && productState.dataUpdate) {
                toast.error(productState.dataUpdate.message);
            }
        }
    }, [productState.dataUpdate]);

    const handleClickGenerateSlug = () => {
        handleError('', 'slug');
        setpPoductUpdate((prevState) => ({
            ...prevState,
            slug: slugify(prevState.name, { lower: true, locale: 'vi' }),
        }));
    };
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setpPoductUpdate((prevState) => ({ ...prevState, name: value }));
    };
    const handleChangeDescribe = (data: string) => {
        handleError('', 'describe');
        setpPoductUpdate((prevState) => ({ ...prevState, describe: data }));
    };
    const handleChangebarCode = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'barCode');
        setpPoductUpdate((prevState) => ({ ...prevState, barCode: value }));
    };
    const handleChangeSlug = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'slug');
        setpPoductUpdate((prevState) => ({ ...prevState, slug: value }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setpPoductUpdate((prevState) => ({ ...prevState, image: file }));
        }
    };
    const handleRemoveFile = () => {
        setpPoductUpdate((prevState) => ({ ...prevState, image: null }));
    };
    const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const checked = event.target.checked;
        setpPoductUpdate((prevState) => {
            const rolestemp = [...prevState.categoriesId];
            if (checked) {
                handleError('', 'categoriesId');
                rolestemp.push(id);
            } else {
                const index = rolestemp.indexOf(id);
                if (index !== -1) {
                    rolestemp.splice(index, 1); // Xóa id khỏi mảng roles
                }
            }
            return { ...prevState, categoriesId: rolestemp };
        });
    };
    return (
        <>
            {' '}
            <main>
                <div className="container-fluid">
                    <h2 className="mt-30 page-title">Sản phẩm</h2>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item">
                            <a href="index.html">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="Sản phẩm.html">Sản phẩm</a>
                        </li>
                        <li className="breadcrumb-item active">Update</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-9 col-md-8">
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2">
                                    <h4>Update Product</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="post-form">
                                        <InputCustome
                                            Title="Tên"
                                            Type="text"
                                            AutoComplete="on"
                                            Id="card-name"
                                            Value={productUpdate.name}
                                            onChange={handleChangeName}
                                            Error={errors.name}
                                            style="col-lg-12 mt-3 mb-3"
                                        />
                                        <ButtonCustome
                                            Title="Tạo Slug tự động"
                                            BackgroundColor="#3caffb"
                                            HoverColor="#2a7aaf"
                                            onClick={handleClickGenerateSlug}
                                            Icon=" fa-solid fa-atom"
                                        />

                                        <InputCustome
                                            Title="Slug"
                                            Type="text"
                                            AutoComplete="on"
                                            Id="card-slug"
                                            Value={productUpdate.slug}
                                            onChange={handleChangeSlug}
                                            Error={errors.slug}
                                            style="col-lg-12 mt-3 mb-3"
                                        />
                                        <InputCustome
                                            Title="barCode"
                                            Type="text"
                                            AutoComplete="on"
                                            Id="card-bar-code"
                                            Value={productUpdate.barCode}
                                            onChange={handleChangebarCode}
                                            Error={errors.barCode}
                                            style="col-lg-12 mt-3 mb-3"
                                        />

                                        <InputImageCustome
                                            Title="Ảnh"
                                            onChangeFile={handleFileChange}
                                            removeFile={handleRemoveFile}
                                            style="col-lg-12 mt-3 mb-3"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2">
                                    <h4>Mô tả</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="post-form">
                                        <EditorCustome
                                            onChangeData={handleChangeDescribe}
                                            Title=""
                                            Id="card-describe"
                                            Value={productUpdate.describe}
                                            Error={errors.describe}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2">
                                    <h4>Category</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="news-content-right pd-20">
                                        {categoryState.dataGetAll.DataSuccess?.listData &&
                                            categoryState.dataGetAll.DataSuccess?.listData.map(
                                                (item, index: number) => {
                                                    return (
                                                        <div key={index} className="col-lg-8 m-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={productUpdate.categoriesId.some(
                                                                    (itemUpdate) => {
                                                                        return itemUpdate === item.id;
                                                                    },
                                                                )}
                                                                onChange={(event) => {
                                                                    handleChangeCheckbox(event, item.id);
                                                                }}
                                                            ></input>
                                                            <label>{item.name}</label>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        {errors.categoriesId ? (
                                            <label className="bg text-danger">{errors.categoriesId}</label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-4">
                            <ButtonCustome
                                Title="Sửa thể loại khách"
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
            </main>
        </>
    );
}

export default SalePage;
