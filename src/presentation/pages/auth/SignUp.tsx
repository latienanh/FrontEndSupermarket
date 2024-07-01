import { ChangeEvent, useEffect, useState } from 'react';
import { ErrorSignUp } from '~/application/model/modelView/AuthModelView';
import { WelcomeSection, WrapAuth } from '~/presentation/components/authComponents';
import { Link, useNavigate } from 'react-router-dom';
import { URL_APP } from '~/presentation/router/Link';
import validateEmail from '~/presentation/utils/ValidateEmail';
// import { apiAuth } from '~/infrastructure/api/authApi';
import { LoadingAuth } from '../loading';
import { toast } from 'react-toastify';
import validateNumberPhone from '~/presentation/utils/ValidatePhoneNumber';
import { SignupRequest } from '~/application/model/modelRequest/AuthModelRequest';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { SignupState, fetchSigup } from '~/application/redux/slide/AuthSlide';
import { InputCustome, InputImageCustome } from '~/presentation/components/share';
function SignUp() {
    const [account, setAcount] = useState<SignupRequest>({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        confilmPassword: '',
        email: '',
        avatar: null,
        phoneNumber: '',
    });
    const [errors, setErrors] = useState<ErrorSignUp>({});
    const dispatch = useDispatch<AppDispatch>();
    const sigUpData: SignupState = useSelector((state: RootState) => state.auth.signUp);
    const loginState = useSelector((state: RootState) => state.auth.login);
    const navigate = useNavigate();

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!account?.userName) {
            handleError('Vui lòng nhập tài khoản !', 'userName');
            isValid = false;
        } else if (account.userName.length > 50) {
            handleError('UserName dưới 50 kí tự !', 'userName');
            isValid = false;
        }
        if (!account?.password) {
            handleError('Vui lòng nhập mật khẩu !', 'passWord');
            isValid = false;
        } else if (account.password.length < 5 && account.password.length > 50) {
            handleError('Mật khẩu phải trên 5 và ít hơn 50 kí tự !', 'passWord');
            isValid = false;
        }
        if (!account?.firstName) {
            handleError('Vui lòng nhập firstName !', 'firstName');
            isValid = false;
        } else if (account.firstName.length < 5 && account.firstName.length > 50) {
            handleError('First Name phải trên 5 và ít hơn 50 kí tự !', 'firstName');
            isValid = false;
        }
        if (!account?.lastName) {
            handleError('Vui lòng nhập lastName !', 'lastName');
            isValid = false;
        } else if (account.lastName.length < 5 && account.lastName.length > 50) {
            handleError('Last Name phải trên 5 và ít hơn 50 kí tự !', 'lastName');
            isValid = false;
        }
        if (account?.password && account.confilmPassword && account.password !== account.confilmPassword) {
            handleError('Xác nhận mật khẩu không đúng !', 'confilmPassword');
            isValid = false;
        }
        if (!account?.email) {
            handleError('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(account.email)) {
            handleError('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (!account?.phoneNumber) {
            handleError('Chưa nhập số điện thoại !', 'phoneNumber');
            isValid = false;
        } else if (!validateNumberPhone(account.phoneNumber)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'phoneNumber');
            isValid = false;
        }
        if (isValid) {
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            dispatch(fetchSigup(account));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (loginState.DataSuccess?.data) {
            toast.success(loginState.DataSuccess.message);
            navigate('/Home');
        } else if (!loginState.isLoading && loginState.isError) {
            if (loginState.DataFailure) {
                toast.error(loginState.DataFailure.message);
            }
        }
    }, [loginState, navigate]);
    useEffect(() => {
        if (sigUpData.DataSuccess) {
            toast.success(sigUpData.DataSuccess.message);
            navigate(URL_APP.Login);
        }
        if (!sigUpData.isLoading && sigUpData.isError) {
            if (sigUpData.DataFailure) {
                toast.error(sigUpData.DataFailure.message);
            }
        }
    }, [sigUpData]);
    const handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'userName');
        setAcount((prevState) => ({ ...prevState, userName: value }));
    };
    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'passWord');
        setAcount((prevState) => ({ ...prevState, password: value }));
    };
    const handleChangeConfilmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'confilmPassword');
        setAcount((prevState) => ({ ...prevState, confilmPassword: value }));
    };
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'email');
        setAcount((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeFisrtName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'firstName');
        setAcount((prevState) => ({ ...prevState, firstName: value }));
    };
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'lastName');
        setAcount((prevState) => ({ ...prevState, lastName: value }));
    };
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'phoneNumber');
        setAcount((prevState) => ({ ...prevState, phoneNumber: value }));
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAcount((prevState) => ({ ...prevState, avatar: file }));
        }
    };
    const handleRemoveFile = () => {
        setAcount((prevState) => ({ ...prevState, avatar: null }));
    };
    return (
        <>
            {sigUpData.isLoading && !sigUpData.isError ? (
                <LoadingAuth />
            ) : (
                <WrapAuth>
                    <div className="card overflow-hidden z-1">
                        <div className="card-body p-0">
                            <div className="row g-0 h-100">
                                <div className="col-md-5 text-center bg-card-gradient">
                                    <WelcomeSection />
                                    <div className="mt-3 mb-4 mt-md-4 mb-md-5" data-bs-theme="light">
                                        <p className="pt-3 text-white">
                                            Bạn đã có tài khoản?
                                            <br />
                                            <Link className="btn btn-outline-light mt-2 px-4" to={URL_APP.Login}>
                                                Đăng nhập
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-7 d-flex flex-center">
                                    <div className="p-4 p-md-5 flex-grow-1">
                                        <h3>Đăng ký</h3>
                                        <form>
                                            <InputCustome
                                                Title="Tên đăng nhập"
                                                Type="text"
                                                AutoComplete="on"
                                                Id="card-name"
                                                onChange={handleChangeUserName}
                                                Error={errors.userName}
                                            />
                                            <InputCustome
                                                Title="Email"
                                                Type="email"
                                                AutoComplete="on"
                                                Id="card-email"
                                                onChange={handleChangeEmail}
                                                Error={errors.email}
                                            />
                                            <InputCustome
                                                Title="First Name"
                                                Type="text"
                                                AutoComplete="on"
                                                Id="card-first-name"
                                                onChange={handleChangeFisrtName}
                                                Error={errors.firstName}
                                            />
                                            <InputCustome
                                                Title="Last Name"
                                                Type="text"
                                                AutoComplete="on"
                                                Id="card-last-name"
                                                onChange={handleChangeLastName}
                                                Error={errors.lastName}
                                            />
                                            <InputImageCustome
                                                Title="Ảnh"
                                                onChangeFile={handleFileChange}
                                                removeFile={handleRemoveFile}
                                            />
                                            <InputCustome
                                                Title="Số điện thoại"
                                                Type="number"
                                                AutoComplete="on"
                                                Id="card-numberphone"
                                                onChange={handleChangeNumberPhone}
                                                Error={errors.phoneNumber}
                                            />

                                            <div className="row gx-2">
                                                <InputCustome
                                                    Title="Mật khẩu"
                                                    Type="password"
                                                    AutoComplete="on"
                                                    Id="card-password"
                                                    onChange={handleChangePassword}
                                                    Error={errors.passWord}
                                                    style="mb-3 col-sm-6"
                                                />
                                                <InputCustome
                                                    Title="Xác nhận mật khẩu"
                                                    Type="password"
                                                    AutoComplete="on"
                                                    Id="card-confirm-password"
                                                    onChange={handleChangeConfilmPassword}
                                                    Error={errors.confilmPassword}
                                                    style="mb-3 col-sm-6"
                                                />
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="card-register-checkbox"
                                                />
                                                <label className="form-label" htmlFor="card-register-checkbox">
                                                    Tôi chấp nhận các<a href="#!"> điều khoản </a>và{' '}
                                                    <a href="#">chính sách bảo mật</a>
                                                </label>
                                            </div>
                                            <div className="mb-3">
                                                <p className="btn btn-primary d-block w-100 mt-3" onClick={validate}>
                                                    Đăng ký
                                                </p>
                                            </div>
                                        </form>
                                        <div className="position-relative mt-4">
                                            <hr />
                                            <div className="divider-content-center">hoặc đăng ký với</div>
                                        </div>
                                        <div className="row g-2 mt-2">
                                            <div className="col-sm-6">
                                                <a
                                                    className="btn btn-outline-google-plus btn-sm d-block w-100"
                                                    href="#"
                                                >
                                                    <span
                                                        className="fab fa-google-plus-g me-2"
                                                        data-fa-transform="grow-8"
                                                    ></span>{' '}
                                                    google
                                                </a>
                                            </div>
                                            <div className="col-sm-6">
                                                <a className="btn btn-outline-facebook btn-sm d-block w-100" href="#">
                                                    <span
                                                        className="fab fa-facebook-square me-2"
                                                        data-fa-transform="grow-8"
                                                    ></span>{' '}
                                                    facebook
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </WrapAuth>
            )}
        </>
    );
}

export default SignUp;
