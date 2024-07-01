import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { ErrorProductCreate, ErrorVariantCreate } from '~/application/model/modelErrorRequest/ErrorEntity';
import { ProductCreateRequest, variantRequest } from '~/application/model/modelRequest/ProductModelResqest';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { AttributeService } from '~/application/redux/slide/AttributeSlide';
import { CategoryService } from '~/application/redux/slide/CategorySlide';
import { ProductService } from '~/application/redux/slide/ProductSlide';
import { ButtonCustome, EditorCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';

type dataAttribute = {
    id: string | null;
    data: string | null;
    dataSplit: string[] | null;
};

function AddProduct() {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const [showAttribute, setShowAttribute] = useState(false);
    const [attributes, setAttributes] = useState<string[]>();
    const [dataAttribute, setDataAttribute] = useState<dataAttribute[]>([]);
    const selectRef = useRef<HTMLSelectElement>(null);
    const productState = useSelector((state: RootState) => state.product);
    const categoryState = useSelector((state: RootState) => state.category);
    const attributeState = useSelector((state: RootState) => state.attribute);
    const dispatch = useDispatch<AppDispatch>();

    const [productCreate, setProductCreate] = useState<ProductCreateRequest>({
        barCode: '',
        name: '',
        slug: '',
        image: null,
        describe: '',
        price: 0,
        categoriesId: [],
        variants: [],
    });
    const [errors, setErrors] = useState<ErrorProductCreate>({});
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(CategoryService.fetchGetAll());
        dispatch(AttributeService.fetchGetAll());
    }, []);
    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };
    const handleVariantError = (errorMessage: string | null, input: string, index: number) => {
        setErrors((prevState) => {
            const errorVariant = prevState.variants?.map((variant, i) => {
                // console.log(i);
                if (i === index) {
                    return {
                        ...variant,
                        [input]: errorMessage,
                    };
                }
                return variant;
            });

            return {
                ...prevState,
                variants: errorVariant || [],
            };
        });
        // setErrors((prevState) => ({ ...prevState, [`variants[${index}].${input}`]: errorMessage }));
    };
    const validate = () => {
        let isValid = true;
        if (!productCreate?.barCode) {
            handleError('Vui lòng nhập barCode !', 'barCode');
            isValid = false;
        } else if (productCreate.barCode.length < 5 && productCreate.barCode.length > 15) {
            handleError('barCode Name phải trên 5 và ít hơn 15 kí tự !', 'barCode');
            isValid = false;
        }
        if (!productCreate?.name) {
            handleError('Vui lòng nhập tên sản phẩm !', 'name');
            isValid = false;
        } else if (productCreate.name.length < 5 && productCreate.name.length > 50) {
            handleError('Tên phải trên 5 và ít hơn 50 kí tự !', 'name');
            isValid = false;
        }
        if (!productCreate?.describe) {
            handleError('Chưa nhập mô tả !', 'describe');
            isValid = false;
        }
        if (!productCreate?.slug) {
            handleError('Chưa nhập đường dẫn !', 'slug');
            isValid = false;
        }
        if (!productCreate.categoriesId || productCreate.categoriesId.length === 0) {
            handleError('Chưa chọn Category!', 'categoriesId');
            isValid = false;
        }
        if (!productCreate.price) {
            handleError('Chưa nhập giá!', 'price');
            isValid = false;
        } else if (productCreate.price < 0) {
            handleError('Giá phải lớn hơn 0!', 'price');
            isValid = false;
        }
        if (productCreate.variants && productCreate.variants.length > 0) {
            productCreate.variants.forEach((item, index) => {
                if (!item?.barCode) {
                    handleVariantError('Vui lòng nhập barCode !', 'barCode', index);
                    isValid = false;
                } else if (item.barCode.length < 5 && item.barCode.length > 15) {
                    handleVariantError('barCode Name phải trên 5 và ít hơn 15 kí tự !', 'barCode', index);
                    isValid = false;
                }
                if (!item?.name) {
                    handleVariantError(`Vui lòng nhập tên biến thể ${index} !`, 'name', index);
                    isValid = false;
                } else if (item.name.length < 5 && item.name.length > 50) {
                    handleVariantError('Tên phải trên 5 và ít hơn 50 kí tự !', 'name', index);
                    isValid = false;
                }
                if (!item?.describe) {
                    handleVariantError('Chưa nhập mô tả !', 'describe', index);
                    isValid = false;
                }
                if (!item?.slug) {
                    handleVariantError('Chưa nhập đường dẫn !', 'slug', index);
                    isValid = false;
                }
                if (!item.price) {
                    handleVariantError('Chưa nhập giá!', 'price', index);
                    isValid = false;
                } else if (item.price < 0) {
                    handleVariantError('Giá phải lớn hơn 0!', 'price', index);

                    isValid = false;
                }
            });
        }
        if (isValid) {
            console.log('hoan thanh');
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            dispatch(ProductService.fetchCreate(productCreate));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!productState.isLoading) {
            if (hasEditDataChanged) {
                if (!productState.isError && productState.dataCreate) {
                    toast.success(productState.dataCreate.message);
                    navigate(URL_APP.Products);
                } else if (productState.isError && productState.dataCreate) {
                    toast.error(productState.dataCreate.message);
                }
            }
        }
    }, [productState.dataCreate]);
    const handleClickGenerateSlug = () => {
        handleError('', 'slug');
        setProductCreate((prevState) => ({
            ...prevState,
            slug: slugify(prevState.name, { lower: true, locale: 'vi' }),
        }));
    };

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setProductCreate((prevState) => ({ ...prevState, name: value }));
    };
    const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        handleError('', 'price');
        setProductCreate((prevState) => ({ ...prevState, price: value }));
    };
    const handleChangeDescribe = (data: string) => {
        handleError('', 'describe');
        setProductCreate((prevState) => ({ ...prevState, describe: data }));
    };
    const handleChangeBarCode = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'barCode');
        setProductCreate((prevState) => ({ ...prevState, barCode: value }));
    };
    const handleChangeSlug = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'slug');
        setProductCreate((prevState) => ({ ...prevState, slug: value }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProductCreate((prevState) => ({ ...prevState, image: file }));
        }
    };
    const handleRemoveFile = () => {
        setProductCreate((prevState) => ({ ...prevState, image: null }));
    };
    const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const checked = event.target.checked;
        setProductCreate((prevState) => {
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
    const handleClickAddAtribute = () => {
        // Lấy các phần tử <option> được chọn
        const selectedOptions = selectRef?.current?.selectedOptions;

        if (selectedOptions) {
            const values = Array.from(selectedOptions).map((option: any) => option.value);

            // Cập nhật state với các giá trị được chọn
            setAttributes(values);
        }
        // Tạo một mảng chứa các giá trị được chọn
    };
    const handleChangeDataAttribute = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = event.target;
        const index = dataAttribute.findIndex((item) => item.id === id);

        if (index !== -1) {
            // Cập nhật giá trị của dataAttribute có id tương ứng
            setDataAttribute((prevState) => [
                ...prevState.slice(0, index),
                { id, data: value, dataSplit: value.split('|') },
                ...prevState.slice(index + 1),
            ]);
        } else {
            // Thêm mới dataAttribute
            setDataAttribute((prevState) => [...prevState, { id: id, data: value, dataSplit: value.split('|') }]);
        }
    };
    const handleChangeVariantName = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        handleVariantError('', 'name', index);
        setProductCreate((prevState) => {
            const updatedVariants = prevState.variants?.map((variant, i) => {
                // console.log(i);
                if (i === index) {
                    return {
                        ...variant,
                        name: event.target.value,
                    };
                }
                return variant;
            });

            return {
                ...prevState,
                variants: updatedVariants || [],
            };
        });
    };
    const handleChangeVariantPrice = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        handleVariantError('', 'price', index);
        // const value = parseFloat(event.target.value);
        setProductCreate((prevState) => {
            const updatedVariants = prevState.variants?.map((variant, i) => {
                // console.log(i);
                if (i === index) {
                    return {
                        ...variant,
                        price: parseFloat(event.target.value),
                    };
                }
                return variant;
            });

            return {
                ...prevState,
                variants: updatedVariants || [],
            };
        });
    };
    const handleChangeVariantSlug = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        handleVariantError('', 'slug', index);
        setProductCreate((prevState) => {
            const updatedVariants = prevState.variants?.map((variant, i) => {
                // console.log(i);
                if (i === index) {
                    return {
                        ...variant,
                        slug: event.target.value,
                    };
                }
                return variant;
            });

            return {
                ...prevState,
                variants: updatedVariants || [],
            };
        });
    };
    const handleChangeVariantBarCode = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        handleVariantError('', 'barCode', index);
        setProductCreate((prevState) => {
            const updatedVariants = prevState.variants?.map((variant, i) => {
                // console.log(i);
                if (i === index) {
                    return {
                        ...variant,
                        barCode: event.target.value,
                    };
                }
                return variant;
            });

            return {
                ...prevState,
                variants: updatedVariants || [],
            };
        });
    };
    const handleChangeVariantDescribe = (data: string, index: number) => {
        handleVariantError('', 'describe', index);
        setProductCreate((prevState) => {
            const updatedVariants = prevState.variants?.map((variant, i) => {
                if (i === index) {
                    return {
                        ...variant,
                        describe: data,
                    };
                }
                return variant;
            });

            return {
                ...prevState,
                variants: updatedVariants || [],
            };
        });
    };
    const handleVariantFileChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (file) {
            setProductCreate((prevState) => {
                const updatedVariants = prevState.variants?.map((variant, i) => {
                    if (i === index) {
                        return {
                            ...variant,
                            image: file,
                        };
                    }
                    return variant;
                });

                return {
                    ...prevState,
                    variants: updatedVariants || [],
                };
            });
        }
    };
    const handleVariantRemoveFile = (index: number) => {
        setProductCreate((prevState) => {
            const updatedVariants = prevState.variants?.map((variant, i) => {
                if (i === index) {
                    return {
                        ...variant,
                        image: null,
                    };
                }
                return variant;
            });

            return {
                ...prevState,
                variants: updatedVariants || [],
            };
        });
    };
    const handleClickVariantGenerateSlug = (index: number) => {
        handleVariantError('', 'slug', index);
        setProductCreate((prevState) => {
            const updatedVariants = prevState.variants?.map((variant, i) => {
                if (i === index) {
                    return {
                        ...variant,
                        slug: slugify(variant.name, { lower: true, locale: 'vi' }),
                    };
                }
                return variant;
            });

            return {
                ...prevState,
                variants: updatedVariants || [],
            };
        });
        setProductCreate((prevState) => ({
            ...prevState,
            slug: slugify(prevState.name, { lower: true, locale: 'vi' }),
        }));
    };
    const handleAddVariant = () => {
        setProductCreate((prevProduct) => {
            let newVariants: variantRequest[] = [];

            dataAttribute.forEach((item1, index1) => {
                item1.dataSplit?.forEach((itemSplit1, indexSplit1) => {
                    dataAttribute.slice(index1 + 1).forEach((item2, index2) => {
                        item2.dataSplit?.forEach((itemSplit2, indexSplit2) => {
                            if (item1.id != null && item2.id != null) {
                                newVariants.push({
                                    name: '',
                                    barCode: '',
                                    describe: '',
                                    slug: '',
                                    image: null,
                                    price: 0,
                                    variantValues: [
                                        { attributeId: item1.id, variantValue: itemSplit1 },
                                        { attributeId: item2.id, variantValue: itemSplit2 },
                                    ],
                                });
                            }
                        });
                    });
                });
            });

            return {
                ...prevProduct,
                variants: newVariants,
            };
        });
        setErrors((prevProduct) => {
            let newVariants: any = [];

            dataAttribute.map((item1, index1) =>
                item1.dataSplit?.map((itemSplit1, indexSplit1) =>
                    dataAttribute.slice(index1 + 1).map((item2, index2) =>
                        item2.dataSplit?.map((itemSplit2, indexSplit2) => {
                            if (item1.id != null && item2.id != null) {
                                console.log(1);
                                newVariants.push({
                                    name: '',
                                    barCode: '',
                                    describe: '',
                                    slug: '',
                                });
                            }
                        }),
                    ),
                ),
            );
            return {
                ...prevProduct,
                variants: newVariants,
            };
        });
    };
    return (
        <>
            {' '}
            <main>
                <div className="container-fluid">
                    <h2 className="mt-30 page-title">Posts</h2>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item">
                            <a href="index.html">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="posts.html">Posts</a>
                        </li>
                        <li className="breadcrumb-item active">Add New</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-9 col-md-8">
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2">
                                    <h4>News Content</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="post-form">
                                        <InputCustome
                                            Title="Tên"
                                            Type="text"
                                            AutoComplete="on"
                                            Id="card-name"
                                            Value={productCreate.name}
                                            onChange={handleChangeName}
                                            Error={errors.name}
                                            style="col-lg-12 mt-3 mb-3"
                                        />
                                        <InputCustome
                                            Title="Giá"
                                            Type="number"
                                            AutoComplete="on"
                                            Id="card-price"
                                            Value={productCreate.price.toString()}
                                            onChange={handleChangePrice}
                                            Error={errors.price}
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
                                            Value={productCreate.slug}
                                            onChange={handleChangeSlug}
                                            Error={errors.slug}
                                            style="col-lg-12 mt-3 mb-3"
                                        />
                                        <InputCustome
                                            Title="barCode"
                                            Type="text"
                                            AutoComplete="on"
                                            Id="card-bar-code"
                                            Value={productCreate.barCode}
                                            onChange={handleChangeBarCode}
                                            Error={errors.barCode}
                                            style="col-lg-12 mt-3 mb-3"
                                        />

                                        <InputImageCustome
                                            Title="Ảnh"
                                            onChangeFile={handleFileChange}
                                            removeFile={handleRemoveFile}
                                            style="col-lg-12 mt-3 mb-3"
                                        />
                                        <EditorCustome
                                            onChangeData={handleChangeDescribe}
                                            Title=""
                                            Id="card-describe"
                                            Value={productCreate.describe}
                                            Error={errors.describe}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2">
                                    <h4>Thêm biến thể và quy đổi </h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="post-form">
                                        <select
                                            className="form-select"
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                if (value == '2') {
                                                    setShowAttribute(true);
                                                } else {
                                                    setShowAttribute(false);
                                                }
                                            }}
                                        >
                                            <option value={1}>Sản phẩm thường</option>
                                            <option value={2}>Sản biến thể</option>
                                            <option value={3}>Sản đặc biệt</option>
                                        </select>
                                        {showAttribute && (
                                            <>
                                                {' '}
                                                <label className="form-label" htmlFor="attribute">
                                                    Biến thể
                                                </label>
                                                <select
                                                    className="form-select"
                                                    // id="organizer"
                                                    multiple={true}
                                                    size={3}
                                                    name="attribute"
                                                    data-options='{"removeItemButton":true,"placeholder":true}'
                                                    ref={selectRef}
                                                >
                                                    {/* <option value="">Chọn thuộc tính</option> */}
                                                    {attributeState.dataGetAll.DataSuccess?.listData &&
                                                        attributeState.dataGetAll.DataSuccess?.listData.map(
                                                            (item, index: number) => {
                                                                return (
                                                                    <>
                                                                        <option key={index} value={item.id}>
                                                                            {item.name}
                                                                        </option>
                                                                    </>
                                                                );
                                                            },
                                                        )}
                                                </select>
                                                <ButtonCustome
                                                    Title="Lưu Thuộc tính"
                                                    BackgroundColor="#3caffb"
                                                    HoverColor="#2a7aaf"
                                                    onClick={handleClickAddAtribute}
                                                    Icon=" fa-solid fa-pen-to-square"
                                                    style="mb-2"
                                                />
                                                {attributes && (
                                                    <div className="row border border-primary rounded pb-4">
                                                        {attributeState.dataGetAll.DataSuccess?.listData.map(
                                                            (item, index) => {
                                                                if (attributes?.includes(item.id))
                                                                    return (
                                                                        <>
                                                                            <div className="row mt-4" key={index}>
                                                                                <span className="col-lg-2 text-info">
                                                                                    {item.name}
                                                                                </span>
                                                                                <div className="col-lg-8">
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        onChange={(event) => {
                                                                                            handleChangeDataAttribute(
                                                                                                event,
                                                                                                item.id,
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    );
                                                            },
                                                        )}
                                                    </div>
                                                )}
                                                <ButtonCustome
                                                    Title="Tạo tự động"
                                                    BackgroundColor="#3caffb"
                                                    HoverColor="#2a7aaf"
                                                    onClick={handleAddVariant}
                                                    Icon=" fa-solid fa-pen-to-square"
                                                    style="mb-3"
                                                />
                                                {productCreate.variants &&
                                                    productCreate.variants.length > 0 &&
                                                    productCreate.variants?.map((item, index) => {
                                                        return (
                                                            <>
                                                                <div
                                                                    className="row border border-primary rounded mb-2 p-2"
                                                                    key={index}
                                                                >
                                                                    <h4>
                                                                        Biến thể{' '}
                                                                        {item.variantValues.map((itemvalue) => {
                                                                            return ' - ' + itemvalue.variantValue;
                                                                        })}
                                                                    </h4>

                                                                    <InputCustome
                                                                        Title="Tên"
                                                                        Type="text"
                                                                        AutoComplete="on"
                                                                        Id="card-name"
                                                                        Value={
                                                                            productCreate.variants &&
                                                                            productCreate.variants[index]
                                                                                ? productCreate.variants[index].name
                                                                                : ''
                                                                        }
                                                                        onChange={(event) => {
                                                                            handleChangeVariantName(event, index);
                                                                        }}
                                                                        Error={
                                                                            errors.variants && errors.variants[index]
                                                                                ? errors.variants[index].name
                                                                                : ''
                                                                        }
                                                                        style="col-lg-3 mt-3 mb-3"
                                                                    />

                                                                    <InputCustome
                                                                        Title="Slug"
                                                                        Type="text"
                                                                        AutoComplete="on"
                                                                        Id="card-slug"
                                                                        Value={
                                                                            productCreate.variants &&
                                                                            productCreate.variants[index]
                                                                                ? productCreate.variants[index].slug
                                                                                : ''
                                                                        }
                                                                        onChange={(event) => {
                                                                            handleChangeVariantSlug(event, index);
                                                                        }}
                                                                        Error={
                                                                            errors.variants && errors.variants[index]
                                                                                ? errors.variants[index].slug
                                                                                : ''
                                                                        }
                                                                        style="col-lg-3 mt-3 mb-3"
                                                                    />
                                                                    <InputCustome
                                                                        Title="Giá"
                                                                        Type="number"
                                                                        AutoComplete="on"
                                                                        Id="card-price"
                                                                        Value={
                                                                            productCreate.variants &&
                                                                            productCreate.variants[index]
                                                                                ? productCreate.variants[
                                                                                      index
                                                                                  ].price.toString()
                                                                                : ''
                                                                        }
                                                                        onChange={(event) => {
                                                                            handleChangeVariantPrice(event, index);
                                                                        }}
                                                                        Error={
                                                                            errors.variants && errors.variants[index]
                                                                                ? errors.variants[index].price
                                                                                : ''
                                                                        }
                                                                        style="col-lg-3 mt-3 mb-3"
                                                                    />
                                                                    <InputCustome
                                                                        Title="barCode"
                                                                        Type="text"
                                                                        AutoComplete="on"
                                                                        Id="card-bar-code"
                                                                        Value={
                                                                            productCreate.variants &&
                                                                            productCreate.variants[index]
                                                                                ? productCreate.variants[index].barCode
                                                                                : ''
                                                                        }
                                                                        onChange={(event) => {
                                                                            handleChangeVariantBarCode(event, index);
                                                                        }}
                                                                        Error={
                                                                            errors.variants && errors.variants[index]
                                                                                ? errors.variants[index].barCode
                                                                                : ''
                                                                        }
                                                                        style="col-lg-3 mt-3 mb-3"
                                                                    />
                                                                    <ButtonCustome
                                                                        Title="Tạo Slug "
                                                                        BackgroundColor="#3caffb"
                                                                        HoverColor="#2a7aaf"
                                                                        onClick={() => {
                                                                            handleClickVariantGenerateSlug(index);
                                                                        }}
                                                                        // Icon=" fa-solid fa-atom"
                                                                        style="col-lg-3 mt-3"
                                                                    />
                                                                    <label>ảnh</label>
                                                                    <InputImageCustome
                                                                        Title="Ảnh"
                                                                        onChangeFile={(event) => {
                                                                            handleVariantFileChange(event, index);
                                                                        }}
                                                                        removeFile={() => {
                                                                            handleVariantRemoveFile(index);
                                                                        }}
                                                                        style="col-lg-12 mt-3 mb-3"
                                                                    />
                                                                    <EditorCustome
                                                                        onChangeData={(event) => {
                                                                            handleChangeVariantDescribe(event, index);
                                                                        }}
                                                                        Title=""
                                                                        Id="card-describe"
                                                                        Value={
                                                                            productCreate.variants &&
                                                                            productCreate.variants[index]
                                                                                ? productCreate.variants[index].describe
                                                                                : ''
                                                                        }
                                                                        Error={
                                                                            errors.variants && errors.variants[index]
                                                                                ? errors.variants[index].describe
                                                                                : ''
                                                                        }
                                                                    />
                                                                </div>
                                                            </>
                                                            // <p
                                                            //     key={`${item1.id}-${index1}-${indexSplit1}-${item2.id}-${index2}-${indexSplit2}`}
                                                            // >
                                                            //     {itemSplit1} + {itemSplit2}
                                                            // </p>
                                                        );
                                                    })}
                                            </>
                                        )}
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
                                                (item: any, index: number) => {
                                                    return (
                                                        <div key={index} className="col-lg-8 m-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={productCreate.categoriesId.some(
                                                                    (itemCreate) => {
                                                                        return itemCreate === item.id;
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
                        </div>{' '}
                        <div className="col-lg-12 col-md-4">
                            <ButtonCustome
                                Title="Thêm sản phẩm"
                                BackgroundColor="#36ef84"
                                HoverColor="#25a35a"
                                onClick={() => {
                                    validate();
                                }}
                                Icon="fa-solid fa-plus"
                                style="mb-5"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default AddProduct;
