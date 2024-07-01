import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '~/application/redux/rootState';
import imageAssets from '~/presentation/assets/images';
import { TermsAndConditions, WrapAuth } from '~/presentation/components/authComponents';
import WelcomeSection from '~/presentation/components/authComponents/WelcomeSection';
import { URL_APP } from '~/presentation/router/Link';

function Logout() {
    const loginState = useSelector((state: RootState) => state.auth.login);
    const navigate = useNavigate();
    useEffect(() => {
        if (loginState.DataSuccess?.data) {
            toast.success(loginState.DataSuccess.message);
            navigate(URL_APP.Home);
        } else if (!loginState.isLoading && loginState.isError) {
            if (loginState.DataFailure) {
                toast.error(loginState.DataFailure.message);
            }
        }
    }, [loginState, navigate]);
    return (
        <>
            <WrapAuth>
                <div className="card overflow-hidden z-1">
                    <div className="card-body p-0">
                        <div className="row g-0 h-100">
                            <div className="col-md-5 text-center bg-card-gradient">
                                <WelcomeSection />
                                <div className="mt-3 mb-4 mt-md-4 mb-md-5" data-bs-theme="light">
                                    <TermsAndConditions />
                                </div>
                            </div>
                            <div className="col-md-7 d-flex flex-center">
                                <div className="p-4 p-md-5 flex-grow-1">
                                    <div className="text-center">
                                        <img
                                            className="d-block mx-auto mb-4"
                                            src={imageAssets.welcome}
                                            alt="shield"
                                            width="100"
                                        />
                                        <h3>Hẹn gặp lại!</h3>
                                        <p>
                                            Cảm ơn bạn đã sử dụng LTA <br />
                                            hiện đã đăng xuất thành công.
                                        </p>
                                        <Link className="btn btn-primary btn-sm mt-3" to={URL_APP.Login}>
                                            <span
                                                className="fas fa-chevron-left me-1"
                                                data-fa-transform="shrink-4 down-1"
                                            ></span>
                                            Trở về trang đăng nhập
                                        </Link>
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

export default Logout;
