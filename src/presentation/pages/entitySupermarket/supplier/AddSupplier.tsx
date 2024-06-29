import { Button, Checkbox } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';
import { ButtonCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';
import { SupplierRequest } from '~/application/model/modelRequest/SupplierModelRequest';
import { ErrorSupplier } from '~/application/model/modelErrorRequest/ErrorEntity';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { SupplierService } from '~/application/redux/slide/SupplierSlide';

function AddSupplier() {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const supplierState = useSelector((state: RootState) => state.supplier);
    const dispatch = useDispatch<AppDispatch>();

    const [supplierCreate, setSupplierCreate] = useState<SupplierRequest>({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
    });
    const [errors, setErrors] = useState<ErrorSupplier>({});
    const navigate = useNavigate();
    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!supplierCreate?.name) {
            handleError('Vui lòng nhập tên thuộc tính !', 'name');
            isValid = false;
        } else if (supplierCreate.name.length < 5 && supplierCreate.name.length > 50) {
            handleError('Tên thuộc tính phải trên 5 và ít hơn 50 kí tự !', 'name');
            isValid = false;
        }
        if (!supplierCreate?.address) {
            handleError('Vui lòng nhập địa chỉ !', 'address');
            isValid = false;
        }
        if (!supplierCreate?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(supplierCreate.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!supplierCreate?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(supplierCreate.phoneNumber)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'phoneNumber');
            isValid = false;
        }
        if (isValid) {
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            dispatch(SupplierService.fetchCreate(supplierCreate));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!supplierState.isLoading) {
            if (hasEditDataChanged) {
                if (!supplierState.isError && supplierState.dataCreate) {
                    toast.success(supplierState.dataCreate.message);
                    navigate(URL_APP.Supplier);
                } else if (supplierState.isError && supplierState.dataCreate) {
                    toast.error(supplierState.dataCreate.message);
                }
            }
        }
    }, [supplierState.dataCreate]);
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setSupplierCreate((prevState) => ({ ...prevState, name: value }));
    };
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setSupplierCreate((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setSupplierCreate((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'address');
        setSupplierCreate((prevState) => ({ ...prevState, address: value }));
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
                                                    Value={supplierCreate.name}
                                                    Error={errors.name}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Email"
                                                    Type="email"
                                                    AutoComplete="on"
                                                    Id="card-email"
                                                    onChange={handleChangeEmail}
                                                    Value={supplierCreate.email}
                                                    Error={errors.email}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Số điện thoại"
                                                    Type="number"
                                                    AutoComplete="on"
                                                    Id="card-numberphone"
                                                    Value={supplierCreate.phoneNumber}
                                                    onChange={handleChangeNumberPhone}
                                                    Error={errors.phoneNumber}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />

                                                <InputCustome
                                                    Title="Địa chỉ"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-address"
                                                    Value={supplierCreate.address}
                                                    onChange={handleChangeAddress}
                                                    Error={errors.address}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                            </div>
                                            <ButtonCustome
                                                Title="Thêm nhà cung cấp"
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
                    </div>
                </main>
            )}
        </>
    );
}

export default AddSupplier;
