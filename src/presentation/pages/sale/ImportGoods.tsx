import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { ErrorProductUpdate } from '~/application/model/modelErrorRequest/ErrorEntity';
import { ProductUpdateRequest } from '~/application/model/modelRequest/ProductModelResqest';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { CategoryService } from '~/application/redux/slide/CategorySlide';
import { EmployeeService } from '~/application/redux/slide/EmployeeSlide';
import { ProductService } from '~/application/redux/slide/ProductSlide';
import { SupplierService } from '~/application/redux/slide/SupplierSlide';
import Employee from '~/domain/entities/supermarketEntities/Employee';
import { Product } from '~/domain/entities/supermarketEntities/Product';
import Supplier from '~/domain/entities/supermarketEntities/Supplier';
import { ButtonCustome, EditorCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';

function ImportGoods() {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const productState = useSelector((state: RootState) => state.product);
    const supplierState = useSelector((state: RootState) => state.supplier);
    const employeeState = useSelector((state: RootState) => state.employee);
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
    const [stockInAdd, setStockInAdd] = useState<StockInRequest>({
        supplierId: '',
        employeeId: '',
        note: '',
        stockInDetails: [],
    });
    const [errors, setErrors] = useState<ErrorProductUpdate>({});

    useEffect(() => {
        dispatch(SupplierService.fetchGetAll());
        dispatch(ProductService.fetchGetAll());
        dispatch(EmployeeService.fetchGetAll());
    }, []);
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

    const handleChangeSupplier = (event: any, newValue: Supplier | null) => {
        if (newValue) {
            setStockInAdd((prev) => ({
                ...prev,
                supplierId: newValue?.id,
            }));
        } else {
            setStockInAdd((prev) => ({
                ...prev,
                supplierId: '',
            }));
        }
    };
    const handleChangeEmployee = (event: any, newValue: Employee | null) => {
        if (newValue) {
            setStockInAdd((prev) => ({
                ...prev,
                employeeId: newValue?.id,
            }));
        } else {
            setStockInAdd((prev) => ({
                ...prev,
                employeeId: '',
            }));
        }
    };
    return (
        <>
            {' '}
            <main>
                <div className="container-fluid">
                    <h2 className="mt-30 page-title">Nhập hàng</h2>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item">
                            <a href="Sản phẩm.html">Nhập hàng</a>
                        </li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2 mb-3">
                                    <h4>Thông tin nhà cung cấp</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="post-form">
                                        <Autocomplete
                                            id="select-supplier"
                                            // sx={{ width: 200 }}
                                            options={supplierState.dataGetAll.DataSuccess?.listData || []}
                                            autoHighlight
                                            getOptionLabel={(option) => option.name}
                                            onChange={handleChangeSupplier}
                                            renderOption={(props, option) => {
                                                const { key, ...optionProps } = props;
                                                return (
                                                    <Box
                                                        key={key}
                                                        component="li"
                                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                        {...optionProps}
                                                    >
                                                        {/* <img
                                                            loading="lazy"
                                                            width="20"
                                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                            alt=""
                                                        /> */}
                                                        {option.name} ({option.phoneNumber}) +{option.address}
                                                    </Box>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Chọn nhà cung cấp"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2 mb-4">
                                    <h4>Sản phẩm nhập </h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="post-form">
                                        <Stack spacing={3} sx={{ width: 500 }}>
                                            <Autocomplete
                                                id="select-supplier"
                                                // sx={{ width: 200 }}
                                                multiple
                                                options={productState.dataGetAll.DataSuccess?.listData || []}
                                                autoHighlight
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue: any) => {
                                                    console.log(newValue);
                                                }}
                                                renderOption={(props, option) => {
                                                    const { key, ...optionProps } = props;
                                                    return (
                                                        <Box
                                                            key={key}
                                                            component="li"
                                                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                            {...optionProps}
                                                        >
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                src={`${IMG_URL}${option.image}`}
                                                                alt=""
                                                            />
                                                            <div>
                                                                <div>
                                                                    Tên:<span>{option.name} </span>
                                                                </div>
                                                                <div>
                                                                    Số lượng:
                                                                    <span
                                                                        className={
                                                                            option.quantity < 10 ? `text-danger` : ''
                                                                        }
                                                                    >
                                                                        {option.quantity}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Box>
                                                    );
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Chọn nhà cung cấp"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="card card-static-2 mb-30">
                                <div className="post-form">
                                    <div className="card-title-2 mb-2">
                                        <h4>Thông tin nhân viên</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <Autocomplete
                                            id="select-supplier"
                                            // sx={{ width: 200 }}
                                            options={employeeState.dataGetAll.DataSuccess?.listData || []}
                                            autoHighlight
                                            getOptionLabel={(option) => option.fullName}
                                            onChange={handleChangeEmployee}
                                            renderOption={(props, option) => {
                                                const { key, ...optionProps } = props;
                                                return (
                                                    <Box
                                                        key={key}
                                                        component="li"
                                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                        {...optionProps}
                                                    >
                                                        {/* <img
                                                            loading="lazy"
                                                            width="20"
                                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                            alt=""
                                                        /> */}
                                                        {option.fullName} ({option.phoneNumber}) +{option.address}
                                                    </Box>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Chọn nhà cung cấp"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
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
                                    // validate();
                                    console.log(stockInAdd);
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

export default ImportGoods;
