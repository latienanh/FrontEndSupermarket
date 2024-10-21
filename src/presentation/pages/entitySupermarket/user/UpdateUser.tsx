import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorUpdateUser } from '~/application/model/modelErrorRequest/ErrorEntity';
import { UserUpdateRequest } from '~/application/model/modelRequest/UserModelRequest';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';
import { UserService } from '~/application/redux/slide/UserSlide';
import { ButtonCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';

function UpdateUser() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const roleState = useSelector((state: RootState) => state.role);
    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [userUpdate, setUserUpdate] = useState<UserUpdateRequest>({
        id: id,
        firstName: '',
        lastName: '',
        email: '',
        avatar: null,
        phoneNumber: '',
        roles: [],
    });
    const [errors, setErrors] = useState<ErrorUpdateUser>({});

    useEffect(() => {
        dispatch(fetchAllRole());
        if (id !== undefined) {
            dispatch(UserService.fetchGetById(id));
        }
    }, []);
    useEffect(() => {
        setUserUpdate((prevState) => ({
            ...prevState,
            firstName: userState.dataGetUserById.DataSuccess?.data.firstName || '',
            lastName: userState.dataGetUserById.DataSuccess?.data.lastName || '',
            email: userState.dataGetUserById.DataSuccess?.data.email || '',
            avatar: null,
            phoneNumber: userState.dataGetUserById.DataSuccess?.data.phoneNumber || '',
            roles: userState.dataGetUserById.DataSuccess?.data?.roles
                ? Object.values(userState.dataGetUserById.DataSuccess.data.roles).map((role) => role.id)
                : [],
        }));
    }, [userState.dataGetUserById]);

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!userUpdate?.firstName) {
            handleError('Vui lòng nhập firstName !', 'firstName');
            isValid = false;
        } else if (userUpdate.firstName.length < 5 && userUpdate.firstName.length > 50) {
            handleError('First Name phải trên 5 và ít hơn 50 kí tự !', 'firstName');
            isValid = false;
        }
        if (!userUpdate?.lastName) {
            handleError('Vui lòng nhập lastName !', 'lastName');
            isValid = false;
        } else if (userUpdate.lastName.length < 5 && userUpdate.lastName.length > 50) {
            handleError('Last Name phải trên 5 và ít hơn 50 kí tự !', 'lastName');
            isValid = false;
        }
        if (!userUpdate?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(userUpdate.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!userUpdate?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(userUpdate.phoneNumber)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'phoneNumber');
            isValid = false;
        }
        if (!userUpdate.roles || userUpdate.roles.length === 0) {
            handleError('Chưa chọn role!', 'roles');
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
                    model: userUpdate,
                };
                dispatch(UserService.fetchUpdate(payload));
                setHasEditDataChanged(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!userState.isLoading) {
            if (!userState.isError && userState.dataUpdate) {
                if (hasEditDataChanged) {
                    toast.success(userState.dataUpdate.message);
                    navigate(URL_APP.User);
                }
            } else if (userState.isError && userState.dataUpdate) {
                toast.error(userState.dataUpdate.message);
            }
        }
    }, [userState.dataUpdate]);

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setUserUpdate((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeFisrtName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'firstName');
        setUserUpdate((prevState) => ({ ...prevState, firstName: value }));
    };
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'lastName');
        setUserUpdate((prevState) => ({ ...prevState, lastName: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setUserUpdate((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUserUpdate((prevState) => ({ ...prevState, avatar: file }));
        }
    };
    const handleRemoveFile = () => {
        setUserUpdate((prevState) => ({ ...prevState, avatar: null }));
    };
    const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const checked = event.target.checked;
        setUserUpdate((prevState) => {
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
                                                    Title="Email"
                                                    Type="email"
                                                    AutoComplete="on"
                                                    Id="card-email"
                                                    onChange={handleChangeEmail}
                                                    Value={userUpdate.email}
                                                    Error={errors.email}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Số điện thoại"
                                                    Type="number"
                                                    AutoComplete="on"
                                                    Id="card-numberphone"
                                                    Value={userUpdate.phoneNumber}
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
                                                    Value={userUpdate.firstName}
                                                    Error={errors.firstName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                                <InputCustome
                                                    Title="Last Name"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-last-name"
                                                    Value={userUpdate.lastName}
                                                    onChange={handleChangeLastName}
                                                    Error={errors.lastName}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />

                                                <InputImageCustome
                                                    Title="Ảnh"
                                                    onChangeFile={handleFileChange}
                                                    removeFile={handleRemoveFile}
                                                    style="col-lg-12 mt-3 mb-3"
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
                                                                                checked={userUpdate.roles.some(
                                                                                    (itemUpdate) => {
                                                                                        return itemUpdate === item.id;
                                                                                    },
                                                                                )}
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
                    </div>
                </main>
            )}
        </>
    );
}

export default UpdateUser;
