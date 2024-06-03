import React, { ReactNode, useState } from 'react';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import Footer from './common/Footter';

import '~/assets/css/admin-style.css';
import '~/assets/css/styles.css';

import '~/assets/js/jquery.min.js';
import '~/assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
// import '~/assets/vendor/chart/highcharts.js';
// import '~/assets/vendor/chart/export-data.js';
// import '~/assets/vendor/chart/accessibility.js';
// import '~/assets/js/scripts.js';
// import '~/assets/js/chart.js';

// import '~/assets/vendor/fontawesome-free/css/all.min.css';
// import '~/assets/vendor/bootstrap/css/bootstrap.min.css';

import { Helmet } from 'react-helmet';
type DefaultLayoutProps = {
    children: ReactNode;
};
function DefaultLayout(props: DefaultLayoutProps) {
    const { children } = props;
    const [isToggleSidenav, setIsToggleSidenav] = useState(false);
    console.log(isToggleSidenav);
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
