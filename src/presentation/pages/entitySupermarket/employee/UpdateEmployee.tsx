import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';

import { ButtonCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';
import { EmployeeRequest } from '~/application/model/modelRequest/EmployeeModelRequest';
import { ErrorEmployee } from '~/application/model/modelErrorRequest/ErrorEntity';
import { EmployeeService } from '~/application/redux/slide/EmployeeSlide';

function UpdateEmployee() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const employeeState = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch<AppDispatch>();
    const [employeeUpdate, setEmployeeUpdate] = useState<EmployeeRequest>({
        id: id,
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        image: null,
        phoneNumber: '',
    });
    const [errors, setErrors] = useState<ErrorEmployee>({});

    useEffect(() => {
        dispatch(fetchAllRole());
        if (id !== undefined) {
            dispatch(EmployeeService.fetchGetById(id));
        }
    }, []);
    useEffect(() => {
        setEmployeeUpdate((prevState) => ({
            ...prevState,
            firstName: employeeState.dataGetEmployeeById.DataSuccess?.data.firstName || '',
            lastName: employeeState.dataGetEmployeeById.DataSuccess?.data.lastName || '',
            email: employeeState.dataGetEmployeeById.DataSuccess?.data.email || '',
            address: employeeState.dataGetEmployeeById.DataSuccess?.data.address || '',
            phoneNumber: employeeState.dataGetEmployeeById.DataSuccess?.data.phoneNumber || '',
        }));
    }, [employeeState.dataGetEmployeeById]);

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!employeeUpdate?.firstName) {
            handleError('Vui lòng nhập firstName !', 'firstName');
            isValid = false;
        } else if (employeeUpdate.firstName.length < 5 && employeeUpdate.firstName.length > 50) {
            handleError('First Name phải trên 5 và ít hơn 50 kí tự !', 'firstName');
            isValid = false;
        }
        if (!employeeUpdate?.lastName) {
            handleError('Vui lòng nhập lastName !', 'lastName');
            isValid = false;
        } else if (employeeUpdate.lastName.length < 5 && employeeUpdate.lastName.length > 50) {
            handleError('Last Name phải trên 5 và ít hơn 50 kí tự !', 'lastName');
            isValid = false;
        }
        if (!employeeUpdate?.address) {
            handleError('Vui lòng nhập địa chỉ !', 'address');
            isValid = false;
        }
        if (!employeeUpdate?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(employeeUpdate.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!employeeUpdate?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(employeeUpdate.phoneNumber)) {
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
                    model: employeeUpdate,
                };
                dispatch(EmployeeService.fetchUpdate(payload));
                setHasEditDataChanged(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!employeeState.isLoading) {
            if (!employeeState.isError && employeeState.dataUpdate) {
                if (hasEditDataChanged) {
                    toast.success(employeeState.dataUpdate.message);
                    navigate(URL_APP.Employee);
                }
            } else if (employeeState.isError && employeeState.dataUpdate) {
                toast.error(employeeState.dataUpdate.message);
            }
        }
    }, [employeeState.dataUpdate]);

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setEmployeeUpdate((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeFisrtName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'firstName');
        setEmployeeUpdate((prevState) => ({ ...prevState, firstName: value }));
    };
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'lastName');
        setEmployeeUpdate((prevState) => ({ ...prevState, lastName: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setEmployeeUpdate((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'address');
        setEmployeeUpdate((prevState) => ({ ...prevState, address: value }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setEmployeeUpdate((prevState) => ({ ...prevState, image: file }));
        }
    };
    const handleRemoveFile = () => {
        setEmployeeUpdate((prevState) => ({ ...prevState, image: null }));
    };
    return (
        <>
            {employeeState.isLoading && !employeeState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">employee</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="category.html">employee</a>
                            </li>
                            <li className="breadcrumb-item active">Add employee</li>
                        </ol>
                        <div className="row">
                            <div className="col-lg col-md-7 ">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>Add New employee</h4>
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
                                                    Value={employeeUpdate.email}
                                                    Error={errors.email}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Số điện thoại"
                                                    Type="number"
                                                    AutoComplete="on"
                                                    Id="card-numberphone"
                                                    Value={employeeUpdate.phoneNumber}
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
                                                    Value={employeeUpdate.firstName}
                                                    Error={errors.firstName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Last Name"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-last-name"
                                                    Value={employeeUpdate.lastName}
                                                    onChange={handleChangeLastName}
                                                    Error={errors.lastName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Địa chỉ"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-address"
                                                    Value={employeeUpdate.address}
                                                    onChange={handleChangeAddress}
                                                    Error={errors.address}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputImageCustome
                                                    Title="Ảnh"
                                                    onChangeFile={handleFileChange}
                                                    removeFile={handleRemoveFile}
                                                    style="col-lg-12 mt-3 mb-3"
                                                />
                                            </div>
                                            <ButtonCustome
                                                Title="Sửa Nhân Viên"
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

export default UpdateEmployee;
