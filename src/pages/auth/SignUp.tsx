import { ChangeEvent, useState } from 'react';
import { ErrorSignUp, SignUpViewModel } from '~/Model/ModelView/AuthModelView';
import { WelcomeSection, WrapAuth } from '~/common/components/authComponents';
import { Link, useNavigate } from 'react-router-dom';
import { URL_APP } from '~/router/Link';
import validateEmail from '~/utils/ValidateEmail';
import { apiAuth } from '~/apiService/AuthService';
import { LoadingAuth } from '../loading';
import { ToastContainer, toast } from 'react-toastify';
import validateNumberPhone from '~/utils/ValidatePhoneNumber';
function SignUp() {
    const [account, setAcount] = useState<SignUpViewModel>({
        userName: '',
        password: '',
        confilmPassword: '',
        email: '',
        numberPhone: '',
    });
    const [errors, setErrors] = useState<ErrorSignUp>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!account?.userName) {
            handleError('Vui lòng nhập tài khoản !', 'userName');
            isValid = false;
        }
        if (!account?.password) {
            handleError('Vui lòng nhập mật khẩu !', 'passWord');
            isValid = false;
        } else if (account.password.length < 5) {
            handleError('Mật khẩu phải trên 5 kí tự !', 'passWord');
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
        if (!account?.numberPhone) {
            handleError('Chưa nhập số điện thoại !', 'numberPhone');
            isValid = false;
        } else if (!validateNumberPhone(account.numberPhone)) {
            handleError('Nhập số điện chưa đúng định dạng !', 'numberPhone');
            isValid = false;
        }
        if (isValid) {
            toast('Thêm tài khoản thành công');
            // regisiter();
        }
    };
    const regisiter = async () => {
        try {
            setLoading(true);
            const model: SignUpViewModel = {
                userName: account?.userName,
                password: account?.password,
                confilmPassword: account?.confilmPassword,
                email: account?.email,
                numberPhone: account?.numberPhone,
            };
            const checkSiup = await apiAuth.sigup(model);
            setLoading(false);
            if (checkSiup) {
                toast('Thêm tài khoản thành công');
                navigate(URL_APP.Login);
            } else {
                toast('Thêm tài khoản thất bại');
            }
        } catch (error) {
            console.log(error);
        }
    };
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
    const handleChangeNumberPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'numberPhone');
        setAcount((prevState) => ({ ...prevState, numberPhone: value }));
    };
    return (
        <>
            {loading ? (
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
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="card-name">
                                                    Tên đăng nhập
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    autoComplete="on"
                                                    id="card-name"
                                                    onChange={handleChangeUserName}
                                                />
                                                {errors.userName ? (
                                                    <label className="bg text-danger">{errors.userName}</label>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="card-email">
                                                    Email
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    autoComplete="on"
                                                    id="card-email"
                                                    onChange={handleChangeEmail}
                                                />
                                                {errors.email ? (
                                                    <label className="bg text-danger">{errors.email}</label>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="card-email">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    autoComplete="on"
                                                    id="card-numberphone"
                                                    onChange={handleChangeNumberPhone}
                                                />
                                                {errors.numberPhone ? (
                                                    <label className="bg text-danger">{errors.numberPhone}</label>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                            <div className="row gx-2">
                                                <div className="mb-3 col-sm-6">
                                                    <label className="form-label" htmlFor="card-password">
                                                        Mật khẩu
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        autoComplete="on"
                                                        id="card-password"
                                                        onChange={handleChangePassword}
                                                    />
                                                    {errors.passWord ? (
                                                        <label className="bg text-danger">{errors.passWord}</label>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                                <div className="mb-3 col-sm-6">
                                                    <label className="form-label" htmlFor="card-confirm-password">
                                                        Xác nhận mật khẩu
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        autoComplete="on"
                                                        id="card-confirm-password"
                                                        onChange={handleChangeConfilmPassword}
                                                    />
                                                    {errors.confilmPassword ? (
                                                        <label className="bg text-danger">
                                                            {errors.confilmPassword}
                                                        </label>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
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
