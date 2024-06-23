import { Button, Checkbox } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorCreateUser } from '~/application/model/modelErrorRequest/ErrorEntity';
import { UserCreateRequest } from '~/application/model/modelRequest/UserModelRequest';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';
import { UserService } from '~/application/redux/slide/UserSlide';
import { ButtonCustome, EditorCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';

function AddUser() {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const roleState = useSelector((state: RootState) => state.role);
    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const [userCreate, setUserCreate] = useState<UserCreateRequest>({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        confilmPassword: '',
        email: '',
        avatar: null,
        phoneNumber: '',
        roles: [],
    });
    const [errors, setErrors] = useState<ErrorCreateUser>({});
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchAllRole());
    }, []);
    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!userCreate?.userName) {
            handleError('Vui lòng nhập tài khoản !', 'userName');
            isValid = false;
        } else if (userCreate.userName.length > 50) {
            handleError('UserName dưới 50 kí tự !', 'userName');
            isValid = false;
        }
        if (!userCreate?.password) {
            handleError('Vui lòng nhập mật khẩu !', 'passWord');
            isValid = false;
        } else if (userCreate.password.length < 5 && userCreate.password.length > 50) {
            handleError('Mật khẩu phải trên 5 và ít hơn 50 kí tự !', 'passWord');
            isValid = false;
        }
        if (!userCreate?.firstName) {
            handleError('Vui lòng nhập firstName !', 'firstName');
            isValid = false;
        } else if (userCreate.firstName.length < 5 && userCreate.firstName.length > 50) {
            handleError('First Name phải trên 5 và ít hơn 50 kí tự !', 'firstName');
            isValid = false;
        }
        if (!userCreate?.lastName) {
            handleError('Vui lòng nhập lastName !', 'lastName');
            isValid = false;
        } else if (userCreate.lastName.length < 5 && userCreate.lastName.length > 50) {
            handleError('Last Name phải trên 5 và ít hơn 50 kí tự !', 'lastName');
            isValid = false;
        }
        if (userCreate?.password && userCreate.confilmPassword && userCreate.password !== userCreate.confilmPassword) {
            handleError('Xác nhận mật khẩu không đúng !', 'confilmPassword');
            isValid = false;
        }
        if (!userCreate?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(userCreate.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!userCreate?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(userCreate.phoneNumber)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'phoneNumber');
            isValid = false;
        }
        if (!userCreate.roles || userCreate.roles.length === 0) {
            handleError('Chưa chọn role!', 'roles');
            isValid = false;
        }
        if (isValid) {
            // console.log(userCreate);
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            dispatch(UserService.fetchCreate(userCreate));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!userState.isLoading) {
            if (hasEditDataChanged) {
                if (!userState.isError && userState.dataCreate) {
                    toast.success(userState.dataCreate.message);
                    navigate(URL_APP.User);
                } else if (userState.isError && userState.dataCreate) {
                    toast.error(userState.dataCreate.message);
                }
            }
        }
    }, [userState.dataCreate]);
    const handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'userName');
        setUserCreate((prevState) => ({ ...prevState, userName: value }));
    };
    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'passWord');
        setUserCreate((prevState) => ({ ...prevState, password: value }));
    };
    const handleChangeConfilmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'confilmPassword');
        setUserCreate((prevState) => ({ ...prevState, confilmPassword: value }));
    };
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setUserCreate((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeFisrtName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'firstName');
        setUserCreate((prevState) => ({ ...prevState, firstName: value }));
    };
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'lastName');
        setUserCreate((prevState) => ({ ...prevState, lastName: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setUserCreate((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUserCreate((prevState) => ({ ...prevState, avatar: file }));
        }
    };
    const handleRemoveFile = () => {
        setUserCreate((prevState) => ({ ...prevState, avatar: null }));
    };
    const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const checked = event.target.checked;

        setUserCreate((prevState) => {
            const rolestemp = [...prevState.roles];
            if (checked) {
                handleError('', 'roles');
                rolestemp.push(id);
            } else {
                const index = rolestemp.indexOf(id);
                if (index !== -1) {
                    rolestemp.splice(index, 1); // Xóa id khỏi mảng roles
                }
            }
            return { ...prevState, roles: rolestemp };
        });
    };
    return (
        <>
            {userState.isLoading && !userState.isError ? (
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
                                                    Title="Tên đăng nhập"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-name"
                                                    onChange={handleChangeUserName}
                                                    Error={errors.userName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Email"
                                                    Type="email"
                                                    AutoComplete="on"
                                                    Id="card-email"
                                                    onChange={handleChangeEmail}
                                                    Error={errors.email}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="First Name"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-first-name"
                                                    onChange={handleChangeFisrtName}
                                                    Error={errors.firstName}
                                                    style="col-lg-4 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Last Name"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-last-name"
                                                    onChange={handleChangeLastName}
                                                    Error={errors.lastName}
                                                    style="col-lg-4 mt-3 mb-3"
                                                />

                                                <InputCustome
                                                    Title="Số điện thoại"
                                                    Type="number"
                                                    AutoComplete="on"
                                                    Id="card-numberphone"
                                                    onChange={handleChangeNumberPhone}
                                                    Error={errors.phoneNumber}
                                                    style="col-lg-4 mt-3 mb-3"
                                                />
                                                <InputImageCustome
                                                    Title="Ảnh"
                                                    onChangeFile={handleFileChange}
                                                    removeFile={handleRemoveFile}
                                                    style="col-lg-12 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Mật khẩu"
                                                    Type="password"
                                                    AutoComplete="on"
                                                    Id="card-password"
                                                    onChange={handleChangePassword}
                                                    Error={errors.passWord}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Xác nhận mật khẩu"
                                                    Type="password"
                                                    AutoComplete="on"
                                                    Id="card-confirm-password"
                                                    onChange={handleChangeConfilmPassword}
                                                    Error={errors.confilmPassword}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <div className="col-lg-12 mt-3  ">
                                                    <div className="card-title-2">
                                                        <h4>Role</h4>
                                                    </div>
                                                    <div className="row m-1  border border-1 order-success rounded">
                                                        {roleState.DataSuccess?.listData &&
                                                            roleState.DataSuccess?.listData.map(
                                                                (item: Role, index: number) => {
                                                                    return (
                                                                        <div key={index} className="col-lg-2 m-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                onChange={(event) => {
                                                                                    handleChangeCheckbox(
                                                                                        event,
                                                                                        item.id,
                                                                                    );
                                                                                }}
                                                                            ></input>
                                                                            <label>{item.name}</label>
                                                                        </div>
                                                                    );
                                                                },
                                                            )}
                                                        {errors.roles ? (
                                                            <label className="bg text-danger">{errors.roles}</label>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <ButtonCustome
                                                Title="Thêm người dùng"
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

export default AddUser;
