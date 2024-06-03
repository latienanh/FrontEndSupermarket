type HeaderProps = {
    onSidebarToggle?: () => void;
};
function Header(props: HeaderProps) {
    const { onSidebarToggle } = props;
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
                        <a className="dropdown-item admin-dropdown-item" href="edit_profile.html">
                            Thay đổi thông tin người dùng
                        </a>
                        <a className="dropdown-item admin-dropdown-item" href="change_password.html">
                            Thay đổi mật khẩu
                        </a>
                        <a className="dropdown-item admin-dropdown-item" href="login.html">
                            Đăng xuất
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
