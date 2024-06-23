import React, { ReactNode, useState } from 'react';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import Footer from './common/Footter';

type DefaultLayoutProps = {
    children: ReactNode;
};
function DefaultLayout(props: DefaultLayoutProps) {
    const { children } = props;
    const [isToggleSidenav, setIsToggleSidenav] = useState(false);
    const handleSidebarToggle = () => {
        setIsToggleSidenav(!isToggleSidenav);
    };

    return (
        <div className={isToggleSidenav ? 'sb-sidenav-toggled' : ''}>
            <div className="sb-nav-fixed">
                <Header onSidebarToggle={handleSidebarToggle} />
                <div id="layoutSidenav">
                    <Sidebar />
                    <div id="layoutSidenav_content">
                        {children}
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
