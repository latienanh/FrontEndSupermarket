import { Link } from 'react-router-dom';
import { DropDownMenuProps, NavigationMenuDropDownProps, NavigationMenuProps } from './typeShare';
import { URL_APP } from '~/presentation/router/Link';

const NavigationMenuDropDown = (props: NavigationMenuDropDownProps) => {
    const { collapseTarget, name, icon, children } = props;
    return (
        <>
            <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseTarget}`}
                aria-expanded="false"
                aria-controls={collapseTarget}
            >
                <div className="sb-nav-link-icon">
                    <i className={icon}></i>
                </div>
                {name}
                <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                </div>
            </a>
            <div
                className="collapse"
                id={collapseTarget}
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
            >
                <nav className="sb-sidenav-menu-nested nav">{children}</nav>
            </div>
        </>
    );
};
const DropDownMenu = (props: DropDownMenuProps) => {
    const { name, linkUrl } = props;
    return (
        <Link className="nav-link sub_nav_link" to={linkUrl}>
            {name}
        </Link>
    );
};
const NavigationMenu = (props: NavigationMenuProps) => {
    const { name, linkUrl, icon } = props;
    return (
        <>
            <Link className="nav-link" to={linkUrl}>
                <div className="sb-nav-link-icon">
                    <i className={icon}></i>
                </div>
                {name}
            </Link>
        </>
    );
};
export { NavigationMenuDropDown, DropDownMenu, NavigationMenu };
