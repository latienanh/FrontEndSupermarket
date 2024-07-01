import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchLogOut } from '~/application/redux/slide/AuthSlide';
import { URL_APP } from '~/presentation/router/Link';

type HeaderProps = {
    onSidebarToggle?: () => void;
};
function Header(props: HeaderProps) {
    const { onSidebarToggle } = props;
    const navgation = useNavigate();
    const logoutServices = useSelector((state: RootState) => state.auth.logout);
    const loginState = useSelector((state: RootState) => state.auth.login);
    const dispatch = useDispatch<AppDispatch>();
    const handleLogOut = () => {
        dispatch(fetchLogOut());
    };
    useEffect(() => {
        if (loginState.DataSuccess == null) {
            navgation(URL_APP.Login);
        }
    });
    useEffect(() => {
        if (logoutServices.DataSuccess) {
            toast.success(logoutServices.DataSuccess?.message);
            navgation(URL_APP.Logout);
        }
        if (logoutServices.DataFailure) {
            toast.error(logoutServices.DataFailure?.message);
        }
    }, [logoutServices.DataSuccess]);
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-light bg-clr">
            <a className="navbar-brand logo-brand" href="index.html">
                LTA SuperMarket
            </a>
            <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" onClick={onSidebarToggle}>
                <i className="fas fa-bars"></i>
            </button>
            <a href="http://gambolthemes.net/html-items/gambo_supermarket_demo/index.html" className="frnt-link">
                <i className="fas fa-external-link-alt"></i>Home
            </a>
            <ul className="navbar-nav ms-auto mr-md-0">
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        id="userDropdown"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="fas fa-user fa-fw"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <Link to={URL_APP.UserProfile} className="dropdown-item admin-dropdown-item">
                            Thay đổi thông tin người dùng
                        </Link>

                        <a className="dropdown-item admin-dropdown-item" href="change_password.html">
                            Thay đổi mật khẩu
                        </a>
                        <div className="dropdown-item admin-dropdown-item" onClick={handleLogOut}>
                            Đăng xuất
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
