import { jwtDecode } from 'jwt-decode';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorUserEdit } from '~/application/model/modelErrorRequest/ErrorEntity';
import { AccessToken } from '~/application/model/modelRequest/AuthModelRequest';
import { UserEditRequest } from '~/application/model/modelRequest/UserModelRequest';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { UserService } from '~/application/redux/slide/UserSlide';
import { Role } from '~/domain/entities/supermarketEntities/Role';
import User from '~/domain/entities/supermarketEntities/User';
import { ButtonCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
const IMAGE_URL = process.env.REACT_APP_IMG_URL;
const UserProfile = () => {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);

    const loginState = useSelector((state: RootState) => state.auth.login.DataSuccess);
    // const token = useSelector((state: RootState) => state.auth.login.DataSuccess?.data.accessToken);
    // const decodeToken: AccessToken = jwtDecode(token);
    const navigate = useNavigate();

    const userServices = useSelector((state: RootState) => state.user);

    const [user, setUser] = useState<UserEditRequest>({
        id: userServices.dataGetUserById.DataSuccess?.data.id,
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        avatar: null,
    });

    const [errors, setErrors] = useState<ErrorUserEdit | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };
    useEffect(() => {
        if (loginState != null) {
            const token = loginState?.data.accessToken;
            const decodeToken: AccessToken = jwtDecode(token);
            dispatch(UserService.fetchGetById(decodeToken.UserId));
        }
    }, []);
    useEffect(() => {
        setUser((prevState) => ({
            ...prevState,
            email: userServices.dataGetUserById.DataSuccess?.data.email || '',
            phoneNumber: userServices.dataGetUserById.DataSuccess?.data.phoneNumber || '',
            firstName: userServices.dataGetUserById.DataSuccess?.data.firstName || '',
            lastName: userServices.dataGetUserById.DataSuccess?.data.lastName || '',
            avatar: null,
        }));
    }, [userServices.dataGetUserById.DataSuccess]);
    const validate = () => {
        let isValid = true;
        if (!user?.firstName) {
            handleError('Vui lòng nhập First Name !', 'firstName');
            isValid = false;
        } else if (user?.firstName.length > 50) {
            handleError('First Name dưới 50 kí tự !', 'firstName');
            isValid = false;
        }
        if (!user?.lastName) {
            handleError('Vui lòng nhập Last Name!', 'lastName');
            isValid = false;
        } else if (user?.lastName.length < 5 && user?.lastName.length > 50) {
            handleError('Last Name phải trên 5 và ít hơn 50 kí tự !', 'lastName');
            isValid = false;
        }
        if (!user?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(user?.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!user?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(user.phoneNumber)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'phoneNumber');
            isValid = false;
        }
        if (isValid) {
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            if (loginState != null) {
                const token = loginState?.data.accessToken;
                const decodeToken: AccessToken = jwtDecode(token);
                if (decodeToken.UserId) {
                    const payload: { id: string; model: UserEditRequest } = {
                        id: decodeToken.UserId,
                        model: user,
                    };
                    dispatch(UserService.fetchEdit(payload));
                    setHasEditDataChanged(true);
                }
            } else {
                alert('khong co userId');
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!userServices.isLoading) {
            if (!userServices.isError && userServices.dataEdit) {
                if (hasEditDataChanged) {
                    toast.success(userServices.dataEdit.message);
                    navigate(URL_APP.Home);
                }
            } else if (userServices.isError && userServices.dataEdit) {
                toast.error(userServices.dataEdit.message);
            }
        }
    }, [userServices.dataEdit]);
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setUser((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeFisrtName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'firstName');
        setUser((prevState) => ({ ...prevState, firstName: value }));
    };
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'lastName');
        setUser((prevState) => ({ ...prevState, lastName: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setUser((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUser((prevState) => ({ ...prevState, avatar: file }));
        }
    };
    const handleRemoveFile = () => {
        setUser((prevState) => ({ ...prevState, avatar: null }));
    };
    return (
        <main>
            <div className="container-fluid">
                <h2 className="mt-30 page-title">Edit Profile</h2>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">
                        <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Edit Profile</li>
                </ol>
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="card card-static-2 pt-4 mb-30">
                            <div className="card-body-table">
                                <div className="shopowner-content-left text-center pd-20">
                                    <img
                                        src={`${IMAGE_URL}${userServices.dataGetUserById.DataSuccess?.data.image}`}
                                        className="shop_img mb-3"
                                        alt=""
                                    />

                                    <div className="shopowner-dt-left">
                                        <h4>{userServices.dataGetUserById.DataSuccess?.data.fullName}</h4>
                                        <span>
                                            {userServices.dataGetUserById.DataSuccess?.data?.roles.map(
                                                (item: Role, index) => {
                                                    if (userServices.dataGetUserById.DataSuccess?.data?.roles.length)
                                                        return `${item.name} ${
                                                            index ==
                                                            userServices.dataGetUserById.DataSuccess?.data?.roles
                                                                .length -
                                                                1
                                                                ? ' '
                                                                : ' , '
                                                        }`;
                                                },
                                            )}
                                        </span>
                                    </div>
                                    <div className="shopowner-dts">
                                        <UserInfoItem
                                            title="Username"
                                            content={userServices.dataGetUserById.DataSuccess?.data.userName}
                                        />
                                        <UserInfoItem
                                            title="Phone"
                                            content={userServices.dataGetUserById.DataSuccess?.data.phoneNumber}
                                        />
                                        <UserInfoItem
                                            title="Email"
                                            content={userServices.dataGetUserById.DataSuccess?.data.email}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Edit Profile</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="row">
                                        <InputCustome
                                            Title="First Name*"
                                            onChange={handleChangeFisrtName}
                                            Type="text"
                                            Id="card-first-name"
                                            AutoComplete="on"
                                            Value={user?.firstName}
                                            style="col-lg-6 mt-3 "
                                            Error={errors?.firstName}
                                        />
                                        <InputCustome
                                            Title="Last Name*"
                                            onChange={handleChangeLastName}
                                            Type="text"
                                            Id="card-last-name"
                                            AutoComplete="on"
                                            Value={user?.lastName}
                                            style="col-lg-6 mt-3"
                                            Error={errors?.lastName}
                                        />
                                        <InputCustome
                                            Title=" Email*"
                                            onChange={handleChangeEmail}
                                            Type="text"
                                            Id="card-email"
                                            AutoComplete="on"
                                            Value={user?.email}
                                            style="col-lg-6 mt-3 mb-3"
                                            Error={errors?.email}
                                        />
                                        <InputCustome
                                            Title="Phone*"
                                            onChange={handleChangeNumberPhone}
                                            Type="text"
                                            Id="card-phone"
                                            AutoComplete="on"
                                            Value={user?.phoneNumber}
                                            style="col-lg-6 mt-3 mb-3"
                                            Error={errors?.phoneNumber}
                                        />
                                        <InputImageCustome
                                            Title="Ảnh"
                                            onChangeFile={handleFileChange}
                                            removeFile={handleRemoveFile}
                                        />
                                        <div className="col-lg-12">
                                            <ButtonCustome
                                                Title="Lưu"
                                                BackgroundColor="#b153d6"
                                                HoverColor="#72368a"
                                                onClick={() => {
                                                    validate();
                                                }}
                                                Icon="fa-regular fa-floppy-disk"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
type UserInfoItemProps = {
    title: string;
    content: string | undefined;
};
const UserInfoItem = (props: UserInfoItemProps) => {
    const { title, content } = props;
    return (
        <>
            <div className="shopowner-dt-list">
                <span className="left-dt">{title}</span>
                <span className="right-dt">{content}</span>
            </div>
        </>
    );
};
export default UserProfile;
