import { Outlet } from 'react-router-dom';
import type { RootState } from '../../../application/redux/rootState';
import { useSelector, useDispatch } from 'react-redux';
function Home() {
    return (
        <main>
            <div className="container-fluid">
                <h2 className="mt-30 page-title">Dashboard</h2>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="row">
                    <div className="col-xl-3 col-md-6">
                        <div className="dashboard-report-card purple">
                            <div className="card-content">
                                <span className="card-title">Order Pending</span>
                                <span className="card-count">2</span>
                            </div>
                            <div className="card-media">
                                <i className="fab fa-rev"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="dashboard-report-card red">
                            <div className="card-content">
                                <span className="card-title">Order Cancel</span>
                                <span className="card-count">0</span>
                            </div>
                            <div className="card-media">
                                <i className="far fa-times-circle"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="dashboard-report-card info">
                            <div className="card-content">
                                <span className="card-title">Order Process</span>
                                <span className="card-count">5</span>
                            </div>
                            <div className="card-media">
                                <i className="fas fa-sync-alt rpt_icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="dashboard-report-card success">
                            <div className="card-content">
                                <span className="card-title">Today Income</span>
                                <span className="card-count">$9568.00</span>
                            </div>
                            <div className="card-media">
                                <i className="fas fa-money-bill rpt_icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-md-12">
                        <div className="card card-static-1 mb-30">
                            <div className="card-body">
                                <div id="earningGraph"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-md-12">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2 pb-3">
                                <h4>Recent Orders</h4>
                                <a href="orders.html" className="view-btn hover-btn">
                                    View All
                                </a>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '130px' }}>Order ID</th>
                                                <th>Item</th>
                                                <th style={{ width: '200px' }}>Date</th>
                                                <th style={{ width: '300px' }}>Address</th>
                                                <th style={{ width: '130px' }}>Status</th>
                                                <th style={{ width: '130px' }}>Total</th>
                                                <th style={{ width: '100px' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ORDER12345</td>
                                                <td>
                                                    <a href="#" target="_blank">
                                                        Product Title Here
                                                    </a>
                                                </td>
                                                <td>
                                                    <span className="delivery-time">15/06/2020</span>
                                                    <span className="delivery-time">4:00PM - 6.00PM</span>
                                                </td>
                                                <td>
                                                    #0000, St No. 8, Shahid Karnail Singh Nagar, MBD Mall, Frozpur road,
                                                    Ludhiana, 141001
                                                </td>
                                                <td>
                                                    <span className="badge-item badge-status">Pending</span>
                                                </td>
                                                <td>$90</td>
                                                <td className="action-btns">
                                                    <a href="order_view.html" className="views-btn">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="order_edit.html" className="edit-btn">
                                                        <i className="fas fa-edit"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ORDER12346</td>
                                                <td>
                                                    <a href="#" target="_blank">
                                                        Product Title Here
                                                    </a>
                                                </td>
                                                <td>
                                                    <span className="delivery-time">13/06/2020</span>
                                                    <span className="delivery-time">2:00PM - 4.00PM</span>
                                                </td>
                                                <td>
                                                    #0000, St No. 8, Shahid Karnail Singh Nagar, MBD Mall, Frozpur road,
                                                    Ludhiana, 141001
                                                </td>
                                                <td>
                                                    <span className="badge-item badge-status">Pending</span>
                                                </td>
                                                <td>$105</td>
                                                <td className="action-btns">
                                                    <a href="order_view.html" className="views-btn">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="order_edit.html" className="edit-btn">
                                                        <i className="fas fa-edit"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ORDER12347</td>
                                                <td>
                                                    <a href="#" target="_blank">
                                                        Product Title Here
                                                    </a>
                                                </td>
                                                <td>
                                                    <span className="delivery-time">13/6/2020</span>
                                                    <span className="delivery-time">5:00PM - 7.00PM</span>
                                                </td>
                                                <td>
                                                    #0000, St No. 8, Shahid Karnail Singh Nagar, MBD Mall, Frozpur road,
                                                    Ludhiana, 141001
                                                </td>
                                                <td>
                                                    <span className="badge-item badge-status">Pending</span>
                                                </td>
                                                <td>$60</td>
                                                <td className="action-btns">
                                                    <a href="order_view.html" className="views-btn">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="order_edit.html" className="edit-btn">
                                                        <i className="fas fa-edit"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ORDER12348</td>
                                                <td>
                                                    <a href="#" target="_blank">
                                                        Product Title Here
                                                    </a>
                                                </td>
                                                <td>
                                                    <span className="delivery-time">12/06/2020</span>
                                                    <span className="delivery-time">01:00PM - 3.00PM</span>
                                                </td>
                                                <td>
                                                    #0000, St No. 8, Shahid Karnail Singh Nagar, MBD Mall, Frozpur road,
                                                    Ludhiana, 141001
                                                </td>
                                                <td>
                                                    <span className="badge-item badge-status">Pending</span>
                                                </td>
                                                <td>$120</td>
                                                <td className="action-btns">
                                                    <a href="order_view.html" className="views-btn">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="order_edit.html" className="edit-btn">
                                                        <i className="fas fa-edit"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet></Outlet>
        </main>
    );
}

export default Home;