import path from 'path';
import { ChangeEvent, useState } from 'react';
import { LoginRequest } from '~/Model/ModelRequest/AuthModelRequest';
import { LoginResponse } from '~/Model/ModelResponse/AuthModelResponse';
import { ErrorLogin, LoginViewModel } from '~/Model/ModelView/AuthModelView';
import { apiAuth } from '~/apiService/AuthService';
import { useNavigate, Link } from 'react-router-dom';
import { URL_APP } from '~/router/Link';
import { WrapAuth, TermsAndConditions, WelcomeSection } from '~/common/components/authComponents';
import { toast } from 'react-toastify';
function Login() {
    const [account, setAcount] = useState<LoginViewModel>({ userName: '', passWord: '' });
    const [errors, setErrors] = useState<ErrorLogin>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const validate = () => {
        let isValid = true;
        if (!account.userName) {
            handleError('Vui lòng nhập tài khoản !', 'userName');
            isValid = false;
        }
        if (!account.passWord) {
            handleError('Vui lòng nhập mật khẩu !', 'passWord');
            isValid = false;
        } else if (account.passWord.length < 5) {
            console.log('vaoday');
            handleError('Mật khẩu phải trên 5 kí tự !', 'passWord');
            isValid = false;
        }
        if (isValid) {
            toast.error('Success Notification !');
            navigate('/');
            // regisiter();
        }
    };
    const regisiter = async () => {
        setLoading(true);
        const model: LoginRequest = {
            userName: account.userName || '',
            password: account.passWord || '',
            rememberMe: true,
        };
        const data: LoginResponse | null = await apiAuth.login(model);
        // setLoading(false);
        if (data !== null) {
            localStorage.setItem('AccessToken', data.accessToken);
            localStorage.setItem('RefreshToken', data.refreshToken);
            toast.success('Success Notification !');
            navigate('/');
        } else {
            alert('Thông tin tài khoản không chính xác');
        }
    };
    const handleError = (errorMessage: string, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };
    const handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'userName');
        setAcount((prevState) => ({ ...prevState, userName: value }));
    };
    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'passWord');
        setAcount((prevState) => ({ ...prevState, passWord: value }));
    };
    return (
        <>
            <WrapAuth>
                <div className="card overflow-hidden z-1">
                    <div className="card-body p-0">
                        <div className="row g-0 h-100">
                            <div className="col-md-5 text-center bg-card-gradient">
                                <WelcomeSection />
                                <div className="mt-3 mb-4 mt-md-4 mb-md-5" data-bs-theme="light">
                                    <p className="text-white">
                                        Bạn chưa có tài khoản?
                                        <br />
                                        <Link className="text-decoration-underline link-light" to={URL_APP.Signup}>
                                            Bắt đầu!
                                        </Link>
                                    </p>
                                    <TermsAndConditions />
                                </div>
                            </div>
                            <div className="col-md-7 d-flex flex-center">
                                <div className="p-4 p-md-5 flex-grow-1">
                                    <div className="row flex-between-center">
                                        <div className="col-auto">
                                            <h3>Đăng nhập tài khoản</h3>
                                        </div>
                                    </div>
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="card-email">
                                                Tên đăng nhập
                                            </label>
                                            <input
                                                className="form-control"
                                                id="card-email"
                                                onChange={handleChangeUserName}
                                            />
                                            {errors.userName ? (
                                                <label className="bg text-danger">{errors.userName}</label>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <label className="form-label" htmlFor="card-password">
                                                    Mật khẩu
                                                </label>
                                            </div>
                                            <input
                                                className="form-control"
                                                id="card-password"
                                                type="password"
                                                onChange={handleChangePassword}
                                            />
                                            {errors.passWord ? (
                                                <label className="bg text-danger">{errors.passWord}</label>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className="row flex-between-center">
                                            <div className="col-auto">
                                                <div className=" d-flex align-items-center ">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="card-checkbox"
                                                    />
                                                    {/* checked="checked" */}
                                                    <label className="form-check-label mb-0 " htmlFor="card-checkbox">
                                                        Nhớ tài khoản
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <Link className="fs--1" to={'/Forgot Password'}>
                                                    Quên mật khẩu?
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p
                                                className="btn btn-primary d-block w-100 mt-3"
                                                // type="submit"
                                                // name="submit"
                                                onClick={() => {
                                                    validate();
                                                }}
                                            >
                                                Đăng nhập
                                            </p>
                                        </div>
                                    </form>
                                    <div className="position-relative mt-4">
                                        <hr />
                                        <div className="divider-content-center">Đăng nhập với</div>
                                    </div>
                                    <div className="row g-2 mt-2">
                                        <div className="col-sm-6">
                                            <a className="btn btn-outline-google-plus btn-sm d-block w-100" href="#">
                                                <span
                                                    className="fab fa-google-plus-g me-2 "
                                                    data-fa-transform="grow-8"
                                                ></span>
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
        </>
    );
}

export default Login;
