import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorSupplier } from '~/application/model/modelErrorRequest/ErrorEntity';

import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';

import { ButtonCustome, InputCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { LoadingAuth } from '../../loading';
import { SupplierRequest } from '~/application/model/modelRequest/SupplierModelRequest';
import { SupplierService } from '~/application/redux/slide/SupplierSlide';

function UpdateSupplier() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const supplierState = useSelector((state: RootState) => state.supplier);
    const dispatch = useDispatch<AppDispatch>();
    const [supplierUpdate, setSupplierUpdate] = useState<SupplierRequest>({
        id: id,
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
    });
    const [errors, setErrors] = useState<ErrorSupplier>({});

    useEffect(() => {
        dispatch(fetchAllRole());
        if (id !== undefined) {
            dispatch(SupplierService.fetchGetById(id));
        }
    }, []);
    useEffect(() => {
        setSupplierUpdate((prevState) => ({
            ...prevState,
            name: supplierState.dataGetSupplierById.DataSuccess?.data.name || '',
            address: supplierState.dataGetSupplierById.DataSuccess?.data.address || '',
            phoneNumber: supplierState.dataGetSupplierById.DataSuccess?.data.phoneNumber || '',
            email: supplierState.dataGetSupplierById.DataSuccess?.data.email || '',
        }));
    }, [supplierState.dataGetSupplierById]);

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!supplierUpdate?.name) {
            handleError('Vui lòng nhập tên thuộc tính !', 'name');
            isValid = false;
        } else if (supplierUpdate.name.length < 5 && supplierUpdate.name.length > 50) {
            handleError('Tên thuộc tính phải trên 5 và ít hơn 50 kí tự !', 'name');
            isValid = false;
        }
        if (!supplierUpdate?.address) {
            handleError('Vui lòng nhập địa chỉ !', 'address');
            isValid = false;
        }
        if (!supplierUpdate?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(supplierUpdate.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!supplierUpdate?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(supplierUpdate.phoneNumber)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'phoneNumber');
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
                    model: supplierUpdate,
                };
                dispatch(SupplierService.fetchUpdate(payload));
                setHasEditDataChanged(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!supplierState.isLoading) {
            if (!supplierState.isError && supplierState.dataUpdate) {
                if (hasEditDataChanged) {
                    toast.success(supplierState.dataUpdate.message);
                    navigate(URL_APP.Supplier);
                }
            } else if (supplierState.isError && supplierState.dataUpdate) {
                toast.error(supplierState.dataUpdate.message);
            }
        }
    }, [supplierState.dataUpdate]);

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setSupplierUpdate((prevState) => ({ ...prevState, name: value }));
    };
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setSupplierUpdate((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setSupplierUpdate((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'address');
        setSupplierUpdate((prevState) => ({ ...prevState, address: value }));
    };
    return (
        <>
            {supplierState.isLoading && !supplierState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">supplier</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="category.html">supplier</a>
                            </li>
                            <li className="breadcrumb-item active">Add supplier</li>
                        </ol>
                        <div className="row">
                            <div className="col-lg col-md-7 ">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>Add New supplier</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="news-content-right pd-20">
                                            <div className="row">
                                                <InputCustome
                                                    Title="Tên"
                                                    Type="name"
                                                    AutoComplete="on"
                                                    Id="card-name"
                                                    onChange={handleChangeName}
                                                    Value={supplierUpdate.name}
                                                    Error={errors.name}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Email"
                                                    Type="email"
                                                    AutoComplete="on"
                                                    Id="card-email"
                                                    onChange={handleChangeEmail}
                                                    Value={supplierUpdate.email}
                                                    Error={errors.email}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Số điện thoại"
                                                    Type="number"
                                                    AutoComplete="on"
                                                    Id="card-numberphone"
                                                    Value={supplierUpdate.phoneNumber}
                                                    onChange={handleChangeNumberPhone}
                                                    Error={errors.phoneNumber}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />

                                                <InputCustome
                                                    Title="Địa chỉ"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-address"
                                                    Value={supplierUpdate.address}
                                                    onChange={handleChangeAddress}
                                                    Error={errors.address}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                            </div>
                                            <ButtonCustome
                                                Title="Sửa nhà cung cấp"
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
                    </div>
                </main>
            )}
        </>
    );
}

export default UpdateSupplier;
