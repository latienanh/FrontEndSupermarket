import { Link, useNavigate } from 'react-router-dom';
import { URL_APP } from '~/router/Link';
function Sidebar() {
    const navigate = useNavigate();
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Dashboard
                        </a>
                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseLayouts"
                            aria-expanded="false"
                            aria-controls="collapseLayouts"
                        >
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-newspaper"></i>
                            </div>
                            Posts
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapseLayouts"
                            aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link sub_nav_link" href="posts.html">
                                    All Posts
                                </a>
                                <a className="nav-link sub_nav_link" href="add_post.html">
                                    Add New
                                </a>
                                <a className="nav-link sub_nav_link" href="post_categories.html">
                                    Categories
                                </a>
                                <a className="nav-link sub_nav_link" href="post_tags.html">
                                    Tags
                                </a>
                            </nav>
                        </div>
                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseLocations"
                            aria-expanded="false"
                            aria-controls="collapseLocations"
                        >
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            Locations
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapseLocations"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link sub_nav_link" href="locations.html">
                                    All Locations
                                </a>
                                <a className="nav-link sub_nav_link" href="add_location.html">
                                    Add Location
                                </a>
                            </nav>
                        </div>
                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseAreas"
                            aria-expanded="false"
                            aria-controls="collapseAreas"
                        >
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-map-marked-alt"></i>
                            </div>
                            Areas
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapseAreas"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link sub_nav_link" href="areas.html">
                                    All Areas
                                </a>
                                <a className="nav-link sub_nav_link" href="add_area.html">
                                    Add Area
                                </a>
                            </nav>
                        </div>
                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseCategories"
                            aria-expanded="false"
                            aria-controls="collapseCategories"
                        >
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-list"></i>
                            </div>
                            Categories
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapseCategories"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link sub_nav_link" to={URL_APP.Categories}>
                                    Danh sách loại sản phẩm
                                </Link>
                                <Link className="nav-link sub_nav_link" to={URL_APP.AddCategory}>
                                    Thêm loại sản phẩm
                                </Link>
                            </nav>
                        </div>
                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseShops"
                            aria-expanded="false"
                            aria-controls="collapseShops"
                        >
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-store"></i>
                            </div>
                            Shops
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapseShops"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link sub_nav_link" href="shops.html">
                                    All Shops
                                </a>
                                <a className="nav-link sub_nav_link" href="add_shop.html">
                                    Add Shop
                                </a>
                            </nav>
                        </div>
                        <a
                            className="nav-link collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseProducts"
                            aria-expanded="false"
                            aria-controls="collapseProducts"
                        >
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-box"></i>
                            </div>
                            Sản phẩm
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapseProducts"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link sub_nav_link" to={URL_APP.Products}>
                                    Đanh sách sản phẩm
                                </Link>
                                <Link className="nav-link sub_nav_link" to={URL_APP.AddProduct}>
                                    Thêm sản phẩm
                                </Link>
                            </nav>
                        </div>
                        <a className="nav-link" href="orders.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-cart-arrow-down"></i>
                            </div>
                            Orders
                        </a>
                        <a className="nav-link" href="customers.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            Customers
                        </a>
                        <a className="nav-link" href="offers.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-gift"></i>
                            </div>
                            Offers
                        </a>
                        <a className="nav-link" href="pages.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-book-open"></i>
                            </div>
                            Pages
                        </a>
                        <a className="nav-link active" href="menu.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-layer-group"></i>
                            </div>
                            Menu
                        </a>
                        <a className="nav-link" href="updater.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-cloud-upload-alt"></i>
                            </div>
                            Updater
                        </a>
                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSettings"
                            aria-expanded="false"
                            aria-controls="collapseSettings"
                        >
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-cog"></i>
                            </div>
                            Setting
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapseSettings"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link sub_nav_link" href="general_setting.html">
                                    General Settings
                                </a>
                                <a className="nav-link sub_nav_link" href="payment_setting.html">
                                    Payment Settings
                                </a>
                                <a className="nav-link sub_nav_link" href="email_setting.html">
                                    Email Settings
                                </a>
                            </nav>
                        </div>
                        <a className="nav-link" href="reports.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-chart-bar"></i>
                            </div>
                            Reports
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
