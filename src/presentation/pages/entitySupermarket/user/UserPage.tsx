import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { useEffect, useState } from 'react';
import { UserService } from '~/application/redux/slide/UserSlide';
import { toast } from 'react-toastify';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';
import { Link } from 'react-router-dom';
import { URL_APP } from '~/presentation/router/Link';
import Swal from 'sweetalert2';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { PaginationControl } from '~/presentation/components/share';

function UserPage() {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((state: RootState) => state.user);
    const [paging, setPaging] = useState<propsFetchPaging>({
        size: 2,
        index: 0,
    });
    const handleClickNext = () => {
        setPaging((prev) => {
            const tempindex = prev.index;
            if (userState.dataGetPagingUser.DataSuccess?.listData.totalPage) {
                if (tempindex < userState.dataGetPagingUser.DataSuccess?.listData.totalPage - 1)
                    return {
                        ...prev,
                        index: prev.index + 1,
                    };
            }
            return prev;
        });
    };
    const handleClickNumber = (a: number) => {
        setPaging((prev) => {
            return {
                ...prev,
                index: a - 1,
            };
        });
    };
    const handleClickPrev = () => {
        setPaging((prev) => {
            return {
                ...prev,
                index: prev.index - 1,
            };
        });
    };
    useEffect(() => {
        dispatch(UserService.fetchGetPaging(paging));
    }, []);
    useEffect(() => {
        dispatch(UserService.fetchGetPaging(paging));
    }, [paging]);
    useEffect(() => {
        if (userState.dataDelete) {
            if (hasEditDataChanged) {
                Swal.fire({
                    title: 'Deleted!',
                    text: `${userState.dataDelete?.message}`,
                    icon: 'success',
                });
            }

            dispatch(UserService.fetchGetPaging(paging));
            setPaging((prev) => {
                return {
                    ...prev,
                    index: 0,
                };
            });
        } else if (!userState.isLoading && userState.isError) {
            toast.error('Có lỗi xảy ra khi xoá');
        }
    }, [userState.dataDelete]);
    const handleDeleteUser = (id: string) => {
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
                dispatch(UserService.fetchDelete(id));
                setHasEditDataChanged(true);
            }
        });
    };
    return (
        <>
            {userState.isLoading && !userState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">User</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">User</li>
                        </ol>
                        <div className="row justify-content-between">
                            <div className="col-lg-12">
                                <Link to={URL_APP.AddUser} className="add-btn hover-btn">
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
                                                Apply
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
                                        <h4>All User</h4>
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
                                                        <th>Tên tài khoản</th>
                                                        <th>Ảnh</th>
                                                        <th>Tên</th>
                                                        <th>Email</th>
                                                        <th>Số điện thoại</th>
                                                        <th>Kích hoạt</th>
                                                        <th>Role</th>
                                                        <th>Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userState.dataGetPagingUser.DataSuccess?.listData.data &&
                                                        userState.dataGetPagingUser.DataSuccess?.listData.data.length >
                                                            0 &&
                                                        userState.dataGetPagingUser.DataSuccess?.listData.data.map(
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
                                                                        <td>{item.userName}</td>
                                                                        <td>
                                                                            <img
                                                                                className="cate-img-6"
                                                                                src={`${IMG_URL}${item.image}`}
                                                                                alt=""
                                                                                style={{ width: 50, height: 50 }}
                                                                            />
                                                                        </td>
                                                                        <td>{item.fullName}</td>
                                                                        <td>{item.email}</td>
                                                                        <td>{item.phoneNumber}</td>
                                                                        <td>
                                                                            {item.isActive ? (
                                                                                <i className="fa-solid fa-circle-check text-success"></i>
                                                                            ) : (
                                                                                <i className="fa-solid fa-circle-xmark text-danger"></i>
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {item.roles?.map(
                                                                                (itemRole: Role, index: number) => {
                                                                                    return (
                                                                                        <span key={index}>
                                                                                            {itemRole.name}
                                                                                            {index ===
                                                                                            item.roles.length - 1
                                                                                                ? ''
                                                                                                : ', '}
                                                                                        </span>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </td>
                                                                        {/* <td>
                                                                <span className="badge-item badge-status">Active</span>
                                                            </td> */}
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
                                                                                    to={`${URL_APP.UpdateUser}/${item.id}`}
                                                                                >
                                                                                    Edit
                                                                                </Link>
                                                                                <div className="dropdown-divider"></div>
                                                                                <a
                                                                                    className="dropdown-item text-danger"
                                                                                    onClick={() => {
                                                                                        handleDeleteUser(item.id);
                                                                                    }}
                                                                                >
                                                                                    Delete user
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
                    <PaginationControl
                        index={paging.index}
                        max={userState.dataGetPagingUser.DataSuccess?.listData.totalPage || 0}
                        onClickPrev={handleClickPrev}
                        onClickNext={handleClickNext}
                        onclickNumber={handleClickNumber}
                    ></PaginationControl>
                </main>
            )}
        </>
    );
}

export default UserPage;
