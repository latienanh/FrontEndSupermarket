import { Button, Checkbox } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { ButtonCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { LoadingAuth } from '../../loading';
import { EmployeeRequest } from '~/application/model/modelRequest/EmployeeModelRequest';
import { ErrorEmployee } from '~/application/model/modelErrorRequest/ErrorEntity';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { EmployeeService } from '~/application/redux/slide/EmployeeSlide';

function AddEmployee() {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const employeeState = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch<AppDispatch>();

    const [employeeCreate, setEmployeeCreate] = useState<EmployeeRequest>({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        image: null,
        phoneNumber: '',
    });
    const [errors, setErrors] = useState<ErrorEmployee>({});
    const navigate = useNavigate();
    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!employeeCreate?.firstName) {
            handleError('Vui lòng nhập firstName !', 'firstName');
            isValid = false;
        } else if (employeeCreate.firstName.length < 5 && employeeCreate.firstName.length > 50) {
            handleError('First Name phải trên 5 và ít hơn 50 kí tự !', 'firstName');
            isValid = false;
        }
        if (!employeeCreate?.lastName) {
            handleError('Vui lòng nhập lastName !', 'lastName');
            isValid = false;
        } else if (employeeCreate.lastName.length < 5 && employeeCreate.lastName.length > 50) {
            handleError('Last Name phải trên 5 và ít hơn 50 kí tự !', 'lastName');
            isValid = false;
        }
        if (!employeeCreate?.address) {
            handleError('Vui lòng nhập địa chỉ !', 'address');
            isValid = false;
        }
        if (!employeeCreate?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(employeeCreate.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!employeeCreate?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(employeeCreate.phoneNumber)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'phoneNumber');
            isValid = false;
        }
        if (isValid) {
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            dispatch(EmployeeService.fetchCreate(employeeCreate));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!employeeState.isLoading) {
            if (hasEditDataChanged) {
                if (!employeeState.isError && employeeState.dataCreate) {
                    toast.success(employeeState.dataCreate.message);
                    navigate(URL_APP.Employee);
                } else if (employeeState.isError && employeeState.dataCreate) {
                    toast.error(employeeState.dataCreate.message);
                }
            }
        }
    }, [employeeState.dataCreate]);
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setEmployeeCreate((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeFisrtName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'firstName');
        setEmployeeCreate((prevState) => ({ ...prevState, firstName: value }));
    };
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'lastName');
        setEmployeeCreate((prevState) => ({ ...prevState, lastName: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setEmployeeCreate((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'address');
        setEmployeeCreate((prevState) => ({ ...prevState, address: value }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setEmployeeCreate((prevState) => ({ ...prevState, image: file }));
        }
    };
    const handleRemoveFile = () => {
        setEmployeeCreate((prevState) => ({ ...prevState, image: null }));
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
                                                    Value={employeeCreate.email}
                                                    Error={errors.email}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Số điện thoại"
                                                    Type="number"
                                                    AutoComplete="on"
                                                    Id="card-numberphone"
                                                    Value={employeeCreate.phoneNumber}
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
                                                    Value={employeeCreate.firstName}
                                                    Error={errors.firstName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Last Name"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-last-name"
                                                    Value={employeeCreate.lastName}
                                                    onChange={handleChangeLastName}
                                                    Error={errors.lastName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Địa chỉ"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-address"
                                                    Value={employeeCreate.address}
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
                                                Title="Thêm nhân viên"
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

export default AddEmployee;
