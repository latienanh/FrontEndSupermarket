import { Outlet } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../application/redux/rootState';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { SaleService } from '~/application/redux/slide/SaleSlide';
import { BarChart } from '@mui/x-charts/BarChart';
import * as signalR from '@microsoft/signalr';
import { LoadingAuth } from '../loading';
function Home() {
    const saleState = useSelector((state: RootState) => state.sale);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7223/reportHub')
            .withAutomaticReconnect()
            .build();

        connection
            .start()
            .then(() => console.log('Connected to SignalR Hub'))
            .catch((err) => console.error('Error while starting connection: ' + err));

        connection.on('RefreshData', () => {
            dispatch(SaleService.fetchGetSaleChart());
            dispatch(SaleService.fetchGetAllInvoice());
            dispatch(SaleService.fetchGetSaleDateNow());
        });

        return () => {
            connection.stop();
        };
    }, []);

    useEffect(() => {
        dispatch(SaleService.fetchGetSaleChart());
        dispatch(SaleService.fetchGetAllInvoice());
        dispatch(SaleService.fetchGetSaleDateNow());
        console.log('da goi du lieu');
    }, []);
    return (
        <>
            {' '}
            {saleState.isLoading && !saleState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">Dashboard</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div className="row">
                            <div className="col-xl-6 col-md-6">
                                <div className="dashboard-report-card info">
                                    <div className="card-content">
                                        <span className="card-title">Số lượng hoá đơn hôm nay</span>
                                        <span className="card-count">
                                            {saleState?.dataGetSaleDateNow?.data.quantityInvoice || 0}
                                        </span>
                                    </div>
                                    <div className="card-media">
                                        <i className="fas fa-sync-alt rpt_icon"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-6">
                                <div className="dashboard-report-card success">
                                    <div className="card-content">
                                        <span className="card-title">THU NHẬP HÔM NAY</span>
                                        <span className="card-count">
                                            {saleState?.dataGetSaleDateNow?.data.totalPriceNow || 0} VNĐ
                                        </span>
                                    </div>
                                    <div className="card-media">
                                        <i className="fas fa-money-bill rpt_icon"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-md-12">
                                <div className="card card-static-1 mb-30">
                                    <div className="card-body">
                                        <BarChart
                                            series={[
                                                {
                                                    data: saleState?.dataGetSaleChart?.data.dailySaleData.map(
                                                        (item) => item.quantity,
                                                    ),

                                                    label: 'Số lượng hoá đơn',
                                                },
                                                {
                                                    data: saleState?.dataGetSaleChart?.data.dailySaleData.map(
                                                        (item) => item.totalPrice,
                                                    ),

                                                    label: 'Tổng tiền (VNĐ)',
                                                },
                                                {
                                                    data: saleState?.dataGetSaleChart?.data.dailySaleData.map(
                                                        (item) => {
                                                            if (item.quantity == 0) {
                                                                return 0;
                                                            } else return item.totalPrice / item.quantity;
                                                        },
                                                    ),

                                                    label: 'Trung bình đơn hàng (VNĐ)',
                                                },
                                            ]}
                                            height={300}
                                            xAxis={[
                                                {
                                                    data: saleState?.dataGetSaleChart?.data.dailySaleData.map((item) =>
                                                        new Date(item.date).toLocaleDateString(),
                                                    ),
                                                    scaleType: 'band',
                                                },
                                            ]}
                                            margin={{ top: 10, bottom: 30, left: 80, right: 10 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-md-12">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2 pb-3">
                                        <h4>Hoá đơn </h4>
                                        {/* <a href="orders.html" className="view-btn hover-btn">
                        View All
                    </a> */}
                                    </div>
                                    <div className="card-body-table">
                                        <div className="table-responsive">
                                            {' '}
                                            <table className="table ucp-table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: '130px' }}>Invoice ID</th>
                                                        <th>Item</th>
                                                        <th style={{ width: '200px' }}>Date</th>
                                                        <th style={{ width: '300px' }}>Khách hàng</th>
                                                        <th style={{ width: '130px' }}>Nhân viên bán</th>
                                                        <th style={{ width: '130px' }}>Tổng hoá đơn</th>
                                                        {/* <th style={{ width: '100px' }}>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {saleState?.dataGetAll &&
                                                        saleState?.dataGetAll.listData &&
                                                        saleState?.dataGetAll.listData.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{item.id}</td>
                                                                    <td>
                                                                        {item.invoiceDetails.map((item) => {
                                                                            return (
                                                                                <span className="delivery-time">
                                                                                    {item.productId}
                                                                                </span>
                                                                            );
                                                                        })}
                                                                    </td>
                                                                    <td>
                                                                        <span className="delivery-time">
                                                                            {new Date(
                                                                                item.invoiceDate,
                                                                            ).toLocaleDateString()}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span>
                                                                            {item.customer?.fullName || 'Ẩn danh'}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span>{item.employee.fullName}</span>
                                                                    </td>
                                                                    <td>{item.totalPrice} VNĐ</td>
                                                                    {/* <td className="action-btns">
                                                    <a href="order_view.html" className="views-btn">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="order_edit.html" className="edit-btn">
                                                        <i className="fas fa-edit"></i>
                                                    </a>
                                                </td> */}
                                                                </tr>
                                                            );
                                                        })}
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
            )}
        </>
    );
}

export default Home;
