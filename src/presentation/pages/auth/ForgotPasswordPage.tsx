import path from 'path';
import { ChangeEvent, useEffect, useState } from 'react';
import { ForgotPassword, ResetPassword } from '~/application/model/modelRequest/AuthModelRequest';
import { ErrorForgotPassword, ErrorResetPassword } from '~/application/model/modelView/AuthModelView';
import { useNavigate, Link } from 'react-router-dom';
import { URL_APP } from '~/presentation/router/Link';
import { WrapAuth, TermsAndConditions, WelcomeSection } from '~/presentation/components/authComponents';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { LoginState, fetchForgotPassword, fetchLogin, fetchResetPassword } from '~/application/redux/slide/AuthSlide';
import { LoadingAuth } from '../loading';
import { InputCustome } from '~/presentation/components/share';
import { validateEmail } from '~/presentation/utils';
function ForgotPasswordPage() {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const [forgotPassword, setForgotPassword] = useState<ForgotPassword>({ email: '' });
    const [resetPassword, setResetPassword] = useState<ResetPassword>({ email: '', newPassword: '', token: '' });
    const [errorsForgotPassword, setErrorsForgotPassword] = useState<ErrorForgotPassword>({});
    const [errorsResetPassword, setErrorsResetPassword] = useState<ErrorResetPassword>({});
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();
    const validateforgotPassword = () => {
        let isValid = true;
        if (!forgotPassword?.email) {
            handleErrorErrorsForgotPassword('Chưa nhập email !', 'email');
            isValid = false;
        } else if (!validateEmail(forgotPassword.email)) {
            handleErrorErrorsForgotPassword('Nhập email chưa đúng định dạng !', 'email');
            isValid = false;
        }
        if (isValid) {
            regisiterForgotPasword();
        }
    };
    const regisiterForgotPasword = async () => {
        dispatch(fetchForgotPassword(forgotPassword));
    };
    const validateResetPassword = () => {
        let isValid = true;
        if (!resetPassword?.token) {
            handleErrorErrorsResetPassword('Chưa nhập token !', 'token');
            isValid = false;
        }
        if (!resetPassword?.newPassword) {
            handleErrorErrorsResetPassword('Vui lòng nhập mật khẩu !', 'newPassword');
            isValid = false;
        } else if (resetPassword.newPassword.length < 5 && resetPassword.newPassword.length > 50) {
            handleErrorErrorsResetPassword('Mật khẩu phải trên 5 và ít hơn 50 kí tự !', 'newPassword');
            isValid = false;
        }
        if (isValid) {
            regisiterResetPasword();
        }
    };
    const regisiterResetPasword = async () => {
        dispatch(fetchResetPassword(resetPassword));
        setHasEditDataChanged(true);
    };
    useEffect(() => {
        if (authState.forgotPassword.DataSuccess && authState.forgotPassword.DataSuccess?.data == true) {
            if (hasEditDataChanged) {
                toast.success(authState.forgotPassword.DataSuccess.message);
            }
        } else if (!authState.forgotPassword.isLoading && authState.forgotPassword.isError) {
            if (authState.forgotPassword.DataFailure) {
                toast.error(authState.forgotPassword.DataFailure.message);
            }
        }
    }, [authState.forgotPassword]);

    useEffect(() => {
        if (authState.resetPassword.DataSuccess) {
            if (hasEditDataChanged) {
                toast.success(authState.resetPassword.DataSuccess.message);
                navigate(URL_APP.Login);
            }
        } else if (!authState.resetPassword.isLoading && authState.resetPassword.isError) {
            if (authState.resetPassword.DataFailure) {
                toast.error(authState.resetPassword.DataFailure.message);
            }
        }
    }, [authState.resetPassword]);

    const handleErrorErrorsForgotPassword = (errorMessage: string, input: string) => {
        setErrorsForgotPassword((prevState) => ({ ...prevState, [input]: errorMessage }));
    };
    const handleErrorErrorsResetPassword = (errorMessage: string, input: string) => {
        setErrorsResetPassword((prevState) => ({ ...prevState, [input]: errorMessage }));
    };
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleErrorErrorsForgotPassword('', 'email');
        setForgotPassword((prevState) => ({ ...prevState, email: value }));
        setResetPassword((prevState) => ({ ...prevState, email: value }));
    };
    const handleChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleErrorErrorsResetPassword('', 'newPassword');
        setResetPassword((prevState) => ({ ...prevState, newPassword: value }));
    };
    const handleChangeToken = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleErrorErrorsResetPassword('', 'token');
        setResetPassword((prevState) => ({ ...prevState, token: value }));
    };
    return (
        <>
            {(authState.forgotPassword.isLoading && !authState.forgotPassword.isError) ||
            (authState.resetPassword.isLoading && !authState.resetPassword.isError) ? (
                <LoadingAuth />
            ) : (
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
                                                <h3>Quên mật khẩu</h3>
                                            </div>
                                        </div>
                                        <form>
                                            <InputCustome
                                                Title="Email"
                                                Type="text"
                                                AutoComplete="on"
                                                Id="card-userName"
                                                onChange={handleChangeEmail}
                                                Error={errorsForgotPassword.email}
                                            />
                                            <div className="mb-3">
                                                <p
                                                    className="btn btn-primary d-block w-100 mt-3"
                                                    // type="submit"
                                                    // name="submit"
                                                    onClick={() => {
                                                        validateforgotPassword();
                                                    }}
                                                >
                                                    Gửi token từ mail
                                                </p>
                                            </div>

                                            <InputCustome
                                                Title="Mật khẩu mới"
                                                Type="password"
                                                AutoComplete="on"
                                                Id="card-password"
                                                onChange={handleChangeNewPassword}
                                                Error={errorsResetPassword.newPassword}
                                            />
                                            <InputCustome
                                                Title="Token"
                                                Type="text"
                                                AutoComplete="on"
                                                Id="card-password"
                                                onChange={handleChangeToken}
                                                Error={errorsResetPassword.token}
                                            />
                                            <div className="mb-3">
                                                <p
                                                    className="btn btn-primary d-block w-100 mt-3"
                                                    // type="submit"
                                                    // name="submit"
                                                    onClick={() => {
                                                        validateResetPassword();
                                                    }}
                                                >
                                                    ResetPassWord
                                                </p>
                                            </div>
                                        </form>
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

export default ForgotPasswordPage;
