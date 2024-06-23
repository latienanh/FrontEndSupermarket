import { Link, useNavigate } from 'react-router-dom';
import { URL_APP } from '~/presentation/router/Link';
import { DropDownMenu, NavigationMenu } from '../../share';
import { NavigationMenuDropDown } from '../../share/navigationMenu';
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
                        <NavigationMenuDropDown
                            collapseTarget="collapseCategories"
                            name="Categories"
                            icon="fas fa-list"
                        >
                            <DropDownMenu name="Danh sách loại sản phẩm" linkUrl={URL_APP.Categories}></DropDownMenu>
                            <DropDownMenu name="Thêm loại sản phẩm" linkUrl={URL_APP.AddCategory}></DropDownMenu>
                        </NavigationMenuDropDown>
                        <NavigationMenuDropDown collapseTarget="collapseProducts" name=" Sản phẩm" icon="fas fa-box">
                            <DropDownMenu name="Đanh sách sản phẩm" linkUrl={URL_APP.Products}></DropDownMenu>
                            <DropDownMenu name="Thêm sản phẩm" linkUrl={URL_APP.AddProduct}></DropDownMenu>
                        </NavigationMenuDropDown>
                        <NavigationMenuDropDown
                            collapseTarget="collapseAttribute"
                            name="Thuộc tính"
                            icon="fa-solid fa-circle-info"
                        >
                            <DropDownMenu name="Đanh sách thuộc tính" linkUrl={URL_APP.Products}></DropDownMenu>
                            <DropDownMenu name="Thêm thuộc tính" linkUrl={URL_APP.AddProduct}></DropDownMenu>
                        </NavigationMenuDropDown>

                        <NavigationMenuDropDown collapseTarget="collapseUser" name="Người dùng" icon="fa-solid fa-user">
                            <DropDownMenu name="Danh sách người dùng" linkUrl={URL_APP.User}></DropDownMenu>
                            <DropDownMenu name="Thêm người dùng" linkUrl={URL_APP.AddUser}></DropDownMenu>
                        </NavigationMenuDropDown>
                        <NavigationMenu name=" Orders" linkUrl="/home" icon="fas fa-cart-arrow-down" />
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
