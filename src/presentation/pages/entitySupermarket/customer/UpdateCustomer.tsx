import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';
import { CustomerService } from '~/application/redux/slide/CustomerSlide';
import { ButtonCustome, InputCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { LoadingAuth } from '../../loading';
import { CustomerRequest } from '~/application/model/modelRequest/CustomerModelRequest';
import { ErrorCustomer } from '~/application/model/modelErrorRequest/ErrorEntity';
import { MemberShipTypeService } from '~/application/redux/slide/MemberShipTypeSlide';
import MemberShipType from '~/domain/entities/supermarketEntities/MemberShipType';

function UpdateCustomer() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const customerState = useSelector((state: RootState) => state.customer);
    const memberShipTypeState = useSelector((state: RootState) => state.memberShipType);
    const dispatch = useDispatch<AppDispatch>();
    const [customerUpdate, setcustomerUpdate] = useState<CustomerRequest>({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        membershipTypeId: '',
    });
    const [errors, setErrors] = useState<ErrorCustomer>({});

    useEffect(() => {
        dispatch(MemberShipTypeService.fetchGetAll());
        if (id !== undefined) {
            dispatch(CustomerService.fetchGetById(id));
        }
    }, []);
    useEffect(() => {
        setcustomerUpdate((prevState) => ({
            ...prevState,
            firstName: customerState.dataGetCustomerById.DataSuccess?.data.firstName || '',
            lastName: customerState.dataGetCustomerById.DataSuccess?.data.lastName || '',
            email: customerState.dataGetCustomerById.DataSuccess?.data.email || '',
            address: customerState.dataGetCustomerById.DataSuccess?.data.address || '',
            phoneNumber: customerState.dataGetCustomerById.DataSuccess?.data.phoneNumber || '',
            membershipTypeId: customerState.dataGetCustomerById.DataSuccess?.data.membershipType.id || '',
        }));
    }, [customerState.dataGetCustomerById]);

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!customerUpdate?.firstName) {
            handleError('Vui lòng nhập firstName !', 'firstName');
            isValid = false;
        } else if (customerUpdate.firstName.length < 5 && customerUpdate.firstName.length > 50) {
            handleError('First Name phải trên 5 và ít hơn 50 kí tự !', 'firstName');
            isValid = false;
        }
        if (!customerUpdate?.lastName) {
            handleError('Vui lòng nhập lastName !', 'lastName');
            isValid = false;
        } else if (customerUpdate.lastName.length < 5 && customerUpdate.lastName.length > 50) {
            handleError('Last Name phải trên 5 và ít hơn 50 kí tự !', 'lastName');
            isValid = false;
        }
        if (!customerUpdate?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(customerUpdate.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!customerUpdate?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(customerUpdate.phoneNumber)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'phoneNumber');
            isValid = false;
        }
        if (!customerUpdate.address) {
            handleError('Chưa chọn địa chỉ !', 'address');
            isValid = false;
        }
        if (!customerUpdate.membershipTypeId) {
            handleError('Chưa chọn memberShipType !', 'membershipTypeId');
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
                    model: customerUpdate,
                };
                dispatch(CustomerService.fetchUpdate(payload));
                setHasEditDataChanged(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!customerState.isLoading) {
            if (!customerState.isError && customerState.dataUpdate) {
                if (hasEditDataChanged) {
                    toast.success(customerState.dataUpdate.message);
                    navigate(URL_APP.Customer);
                }
            } else if (customerState.isError && customerState.dataUpdate) {
                toast.error(customerState.dataUpdate.message);
            }
        }
    }, [customerState.dataUpdate]);

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setcustomerUpdate((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeFisrtName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'firstName');
        setcustomerUpdate((prevState) => ({ ...prevState, firstName: value }));
    };
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'lastName');
        setcustomerUpdate((prevState) => ({ ...prevState, lastName: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setcustomerUpdate((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleChangeAdrress = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'address');
        setcustomerUpdate((prevState) => ({ ...prevState, address: value }));
    };
    const handleChangeMemberShipType = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        handleError('', 'membershipTypeId');
        setcustomerUpdate((prevState) => ({ ...prevState, membershipTypeId: value }));
    };
    return (
        <>
            {customerState.isLoading && !customerState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">Customer</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="category.html">Customer</a>
                            </li>
                            <li className="breadcrumb-item active">Add Customer</li>
                        </ol>
                        <div className="row">
                            <div className="col-lg col-md-7 ">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>Add New Customer</h4>
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
                                                    Value={customerUpdate.email}
                                                    Error={errors.email}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Số điện thoại"
                                                    Type="number"
                                                    AutoComplete="on"
                                                    Id="card-numberphone"
                                                    Value={customerUpdate.phoneNumber}
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
                                                    Value={customerUpdate.firstName}
                                                    Error={errors.firstName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Last Name"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-last-name"
                                                    Value={customerUpdate.lastName}
                                                    onChange={handleChangeLastName}
                                                    Error={errors.lastName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Địa chỉ"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-last-address"
                                                    Value={customerUpdate.address}
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
                                                            value={customerUpdate.membershipTypeId}
                                                            onChange={handleChangeMemberShipType}
                                                        >
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
                                        </div>
                                        <ButtonCustome
                                            Title="Sửa người dùng"
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

export default UpdateCustomer;
