import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';
import { Link } from 'react-router-dom';
import { URL_APP } from '~/presentation/router/Link';
import Swal from 'sweetalert2';
import { MemberShipTypeService } from '~/application/redux/slide/MemberShipTypeSlide';

function MemberShipTypePage() {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const memberShipTypeState = useSelector((state: RootState) => state.memberShipType);
    useEffect(() => {
        dispatch(MemberShipTypeService.fetchGetAll());
    }, []);

    useEffect(() => {
        if (memberShipTypeState.dataDelete) {
            if (hasEditDataChanged) {
                Swal.fire({
                    title: 'Deleted!',
                    text: `${memberShipTypeState.dataDelete?.message}`,
                    icon: 'success',
                });
            }
            dispatch(MemberShipTypeService.fetchGetAll());
        } else if (!memberShipTypeState.isLoading && memberShipTypeState.isError) {
            toast.error('Có lỗi xảy ra khi xoá');
        }
    }, [memberShipTypeState.dataDelete]);
    const handleDeleteMemberShipType = (id: string) => {
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: 'Khi bạn xoá không thể khôi phục nó!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không',
            confirmButtonText: 'Đúng, tôi xoá nó!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(MemberShipTypeService.fetchDelete(id));
                setHasEditDataChanged(true);
            }
        });
    };
    return (
        <>
            {memberShipTypeState.isLoading && !memberShipTypeState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">MemberShipType</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">MemberShipType</li>
                        </ol>
                        <div className="row justify-content-between">
                            <div className="col-lg-12">
                                <Link to={URL_APP.AddMemberShipType} className="add-btn hover-btn">
                                    Thêm mới
                                </Link>
                            </div>
                            {/* <div className="col-lg-3 col-md-4">
                                <div className="bulk-section mt-30">
                                    <div className="input-group">
                                        <select id="action" name="action" className="form-control">
                                            <option selected>Bulk Actions</option>
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                            <option value="3">Delete</option>
                                        </select>
                                        <div className="input-group-append">
                                            <button className="status-btn hover-btn" type="submit">
                                                Applys
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-lg-5 col-md-6">
                                <div className="bulk-section mt-30">
                                    <div className="search-by-name-input">
                                        <input type="text" className="form-control" placeholder="Search" />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <button className="status-btn hover-btn" type="submit">
                                                Tìm kiếm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="card card-static-2 mt-30 mb-30">
                                    <div className="card-title-2  pb-3">
                                        <h4>All MemberShipType</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="table-responsive">
                                            <table className="table ucp-table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <input type="checkbox" className="check-all" />
                                                        </th>
                                                        <th>STT</th>
                                                        <th>ID</th>
                                                        <th>Tên</th>
                                                        <th>Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {memberShipTypeState.dataGetAllMSTs.DataSuccess?.listData &&
                                                        memberShipTypeState.dataGetAllMSTs.DataSuccess?.listData
                                                            .length > 0 &&
                                                        memberShipTypeState.dataGetAllMSTs.DataSuccess?.listData.map(
                                                            (item, index) => {
                                                                return (
                                                                    <tr key={`table-category-${index}`}>
                                                                        <td>
                                                                            <input
                                                                                type="checkbox"
                                                                                className="check-item"
                                                                                name="ids[]"
                                                                                value="11"
                                                                            />
                                                                        </td>

                                                                        <td>{index}</td>
                                                                        <td>{item.id}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>
                                                                            <button
                                                                                className="btn btn-falcon-default btn-sm dropdown-toggle ms-2 dropdown-caret-none"
                                                                                type="button"
                                                                                data-bs-toggle="dropdown"
                                                                                aria-haspopup="true"
                                                                                aria-expanded="false"
                                                                            >
                                                                                <span className="fas fa-ellipsis-h"></span>
                                                                            </button>
                                                                            <div className="dropdown-menu">
                                                                                <Link
                                                                                    className="dropdown-item"
                                                                                    to={`${URL_APP.UpdateMemberShipType}/${item.id}`}
                                                                                >
                                                                                    Edit
                                                                                </Link>
                                                                                <div className="dropdown-divider"></div>
                                                                                <a
                                                                                    className="dropdown-item text-danger"
                                                                                    onClick={() => {
                                                                                        handleDeleteMemberShipType(
                                                                                            item.id,
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    Delete MemberShipType
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            },
                                                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}
export default MemberShipTypePage;
