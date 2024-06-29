import { Button, Checkbox } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorCreateUser, ErrorCustomer } from '~/application/model/modelErrorRequest/ErrorEntity';
import { UserCreateRequest } from '~/application/model/modelRequest/UserModelRequest';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';
import { UserService } from '~/application/redux/slide/UserSlide';
import { ButtonCustome, EditorCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';
import { CustomerRequest } from '~/application/model/modelRequest/CustomerModelRequest';
import { MemberShipTypeService } from '~/application/redux/slide/MemberShipTypeSlide';
import { CustomerService } from '~/application/redux/slide/CustomerSlide';
import MemberShipType from '~/domain/entities/supermarketEntities/MemberShipType';

function AddCustomer() {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const customerState = useSelector((state: RootState) => state.customer);
    const memberShipTypeState = useSelector((state: RootState) => state.memberShipType);
    const dispatch = useDispatch<AppDispatch>();
    const [customerCreate, setCustomerCreate] = useState<CustomerRequest>({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        membershipTypeId: '',
    });
    const [errors, setErrors] = useState<ErrorCustomer>({});
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(MemberShipTypeService.fetchGetAll());
    }, []);

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!customerCreate?.firstName) {
            handleError('Vui lòng nhập firstName !', 'firstName');
            isValid = false;
        } else if (customerCreate.firstName.length < 5 && customerCreate.firstName.length > 50) {
            handleError('First Name phải trên 5 và ít hơn 50 kí tự !', 'firstName');
            isValid = false;
        }
        if (!customerCreate?.lastName) {
            handleError('Vui lòng nhập lastName !', 'lastName');
            isValid = false;
        } else if (customerCreate.lastName.length < 5 && customerCreate.lastName.length > 50) {
            handleError('Last Name phải trên 5 và ít hơn 50 kí tự !', 'lastName');
            isValid = false;
        }
        if (!customerCreate?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(customerCreate.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!customerCreate?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(customerCreate.phoneNumber)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'phoneNumber');
            isValid = false;
        }
        if (!customerCreate.address) {
            handleError('Chưa chọn địa chỉ !', 'address');
            isValid = false;
        }
        if (!customerCreate.membershipTypeId) {
            handleError('Chưa chọn memberShipType !', 'membershipTypeId');
            isValid = false;
        }
        if (isValid) {
            console.log(customerCreate);
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            dispatch(CustomerService.fetchCreate(customerCreate));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!customerState.isLoading) {
            if (hasEditDataChanged) {
                if (!customerState.isError && customerState.dataCreate) {
                    toast.success(customerState.dataCreate.message);
                    navigate(URL_APP.Customer);
                } else if (customerState.isError && customerState.dataCreate) {
                    toast.error(customerState.dataCreate.message);
                }
            }
        }
    }, [customerState.dataCreate]);
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setCustomerCreate((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeFisrtName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'firstName');
        setCustomerCreate((prevState) => ({ ...prevState, firstName: value }));
    };
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'lastName');
        setCustomerCreate((prevState) => ({ ...prevState, lastName: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setCustomerCreate((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleChangeAdrress = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'address');
        setCustomerCreate((prevState) => ({ ...prevState, address: value }));
    };
    const handleChangeMemberShipType = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        handleError('', 'membershipTypeId');
        setCustomerCreate((prevState) => ({ ...prevState, membershipTypeId: value }));
    };
    return (
        <>
            {customerState.isLoading && !customerState.isError ? (
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
                                                    Title="Email"
                                                    Type="email"
                                                    AutoComplete="on"
                                                    Id="card-email"
                                                    onChange={handleChangeEmail}
                                                    Value={customerCreate.email}
                                                    Error={errors.email}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Số điện thoại"
                                                    Type="number"
                                                    AutoComplete="on"
                                                    Id="card-numberphone"
                                                    Value={customerCreate.phoneNumber}
                                                    onChange={handleChangeNumberPhone}
                                                    Error={errors.phoneNumber}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="First Name"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-first-name"
                                                    onChange={handleChangeFisrtName}
                                                    Value={customerCreate.firstName}
                                                    Error={errors.firstName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Last Name"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-last-name"
                                                    Value={customerCreate.lastName}
                                                    onChange={handleChangeLastName}
                                                    Error={errors.lastName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Địa chỉ"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-last-address"
                                                    Value={customerCreate.address}
                                                    onChange={handleChangeAdrress}
                                                    Error={errors.address}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />

                                                <div className="col-lg-6 mt-3 ">
                                                    <label htmlFor="dropdown" className="form-label">
                                                        Loại khách hàng
                                                    </label>
                                                    <div>
                                                        <select
                                                            id="dropdown"
                                                            className="form-select"
                                                            onChange={handleChangeMemberShipType}
                                                        >
                                                            <option value="">Chọn loại khách hàng</option>
                                                            {memberShipTypeState.dataGetAllMSTs.DataSuccess?.listData &&
                                                                memberShipTypeState.dataGetAllMSTs.DataSuccess?.listData.map(
                                                                    (item: MemberShipType, index: number) => {
                                                                        return (
                                                                            <option key={index} value={item.id}>
                                                                                {item.name}
                                                                            </option>
                                                                        );
                                                                    },
                                                                )}
                                                        </select>
                                                    </div>
                                                    {errors.membershipTypeId ? (
                                                        <label className="bg text-danger">
                                                            {errors.membershipTypeId}
                                                        </label>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
                                            <ButtonCustome
                                                Title="Thêm khách hàng"
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

export default AddCustomer;
