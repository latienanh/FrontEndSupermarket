import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { useEffect, useState } from 'react';
import { CategoryService } from '~/application/redux/slide/CategorySlide';
import { Link, useNavigate } from 'react-router-dom';
import { URL_APP } from '~/presentation/router/Link';
import { ButtonCustome, Describe, PaginationControl } from '~/presentation/components/share';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AddCategoryParams } from './AddCategory';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
type ShowDescribe = {
    isShow: boolean;
    describe: string;
};
function CategoryPage() {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const dispatch = useDispatch<AppDispatch>();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const [describe, setDescribe] = useState<ShowDescribe>({
        describe: '',
        isShow: false,
    });
    const dataCategory = useSelector((state: RootState) => state.category);
    const [paging, setPaging] = useState<propsFetchPaging>({
        size: 2,
        index: 0,
    });
    const handleClose = () => {
        setDescribe((prev) => ({
            ...prev,
            isShow: false,
        }));
    };
    const handleDeleteCategory = (id: string) => {
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
                dispatch(CategoryService.fetchDelete(id));
                setHasEditDataChanged(true);
            }
        });
    };
    const handleClickNext = () => {
        setPaging((prev) => {
            const tempindex = prev.index;
            if (dataCategory.dataGetCountPaging?.data) {
                if (tempindex < dataCategory.dataGetCountPaging?.data - 1)
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
        dispatch(CategoryService.fetchGetPaging(paging));
        dispatch(CategoryService.fetchGetCountPaging(paging.size));
    }, []);
    useEffect(() => {
        dispatch(CategoryService.fetchGetPaging(paging));
    }, [paging]);
    useEffect(() => {
        if (dataCategory.dataDelete) {
            if (hasEditDataChanged) {
                Swal.fire({
                    title: 'Deleted!',
                    text: `${dataCategory.dataDelete?.message}`,
                    icon: 'success',
                });
            }

            dispatch(CategoryService.fetchGetPaging(paging));
            dispatch(CategoryService.fetchGetCountPaging(paging.size));
            setPaging((prev) => {
                return {
                    ...prev,
                    index: 0,
                };
            });
        } else if (!dataCategory.isLoading && dataCategory.isError) {
            toast.error('Có lỗi xảy ra khi xoá');
        }
    }, [dataCategory.dataDelete]);
    return (
        <>
            {' '}
            <main>
                <div className="container-fluid">
                    <h2 className="mt-30 page-title">Categories</h2>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item">
                            <a href="index.html">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">Categories</li>
                    </ol>
                    <div className="row justify-content-between">
                        <div className="col-lg-12">
                            <Link to={URL_APP.AddCategory} className="add-btn hover-btn">
                                Add New
                            </Link>
                        </div>

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
                                    <h4>All Categories</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="table-responsive">
                                        <table className="table ucp-table table-hover">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>
                                                        <input type="checkbox" className="check-all" />
                                                    </th>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Ảnh</th>
                                                    <th>Mô Tả</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataCategory.dataGetPagingCategory.DataSuccess?.listData &&
                                                    dataCategory.dataGetPagingCategory.DataSuccess?.listData.length >
                                                        0 &&
                                                    dataCategory.dataGetPagingCategory.DataSuccess?.listData.map(
                                                        (item, index) => {
                                                            return (
                                                                <>
                                                                    {' '}
                                                                    <tr key={`table-category-${index}`}>
                                                                        <td></td>
                                                                        <td>
                                                                            <input
                                                                                type="checkbox"
                                                                                className="check-item"
                                                                                name="ids[]"
                                                                                value="11"
                                                                            />
                                                                        </td>
                                                                        <td>{item.id}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>
                                                                            <img
                                                                                className="cate-img "
                                                                                src={`${IMG_URL}${item.image}`}
                                                                                alt=""
                                                                                style={{ width: 50, height: 50 }}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <ButtonCustome
                                                                                Title="Xem"
                                                                                BackgroundColor="#3caffb"
                                                                                HoverColor="#2a7aaf"
                                                                                onClick={() => {
                                                                                    // handleShow();
                                                                                    setDescribe((prev) => ({
                                                                                        ...prev,
                                                                                        isShow: true,
                                                                                        describe:
                                                                                            item.describe ||
                                                                                            'Chưa có gì',
                                                                                    }));
                                                                                }}
                                                                                Icon=" fa-regular fa-eye"
                                                                            />
                                                                        </td>

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
                                                                                    to={`${URL_APP.UpdateCategory}/${item.id}`}
                                                                                >
                                                                                    Edit
                                                                                </Link>
                                                                                <Link
                                                                                    className="dropdown-item"
                                                                                    to={`${URL_APP.AddCategory}/${item.id}`}
                                                                                >
                                                                                    Thêm loại thấp hơn
                                                                                </Link>
                                                                                <div className="dropdown-divider"></div>
                                                                                <a
                                                                                    className="dropdown-item text-danger"
                                                                                    onClick={() => {
                                                                                        handleDeleteCategory(item.id);
                                                                                    }}
                                                                                >
                                                                                    Delete Category
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    {item.categoryChildren != null &&
                                                                        item.categoryChildren.map((itemchi, index) => {
                                                                            return (
                                                                                <tr
                                                                                    key={`table-category-children-${index}`}
                                                                                    style={{
                                                                                        margin: 20,
                                                                                        // backgroundColor: 'red',
                                                                                    }}
                                                                                >
                                                                                    <td>
                                                                                        <div
                                                                                            style={{
                                                                                                marginTop: 20,
                                                                                                transform:
                                                                                                    'rotate(90deg) scaleY(-1)',
                                                                                                display: 'flex',
                                                                                                justifyContent:
                                                                                                    'center',
                                                                                                alignContent: 'center',
                                                                                            }}
                                                                                        >
                                                                                            <i className="fa-solid fa-arrow-turn-down"></i>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            className="check-item"
                                                                                            name="ids[]"
                                                                                            value="11"
                                                                                        />
                                                                                    </td>
                                                                                    <td>{itemchi.id}</td>
                                                                                    <td>{itemchi.name}</td>
                                                                                    <td>
                                                                                        <img
                                                                                            className="cate-img "
                                                                                            src={`${IMG_URL}${itemchi.image}`}
                                                                                            alt=""
                                                                                            style={{
                                                                                                width: 50,
                                                                                                height: 50,
                                                                                            }}
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <ButtonCustome
                                                                                            Title="Xem"
                                                                                            BackgroundColor="#3caffb"
                                                                                            HoverColor="#2a7aaf"
                                                                                            onClick={() => {
                                                                                                // handleShow();
                                                                                                setDescribe((prev) => ({
                                                                                                    ...prev,
                                                                                                    isShow: true,
                                                                                                    describe:
                                                                                                        itemchi.describe ||
                                                                                                        'Chưa có gì',
                                                                                                }));
                                                                                            }}
                                                                                            Icon=" fa-regular fa-eye"
                                                                                        />
                                                                                    </td>
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
                                                                                                to={`${URL_APP.UpdateCategory}/${itemchi.id}`}
                                                                                            >
                                                                                                Edit
                                                                                            </Link>
                                                                                            <div className="dropdown-divider"></div>
                                                                                            <a
                                                                                                className="dropdown-item text-danger"
                                                                                                onClick={() => {
                                                                                                    handleDeleteCategory(
                                                                                                        itemchi.id,
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                Delete Category
                                                                                            </a>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                </>
                                                            );
                                                        },
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PaginationControl
                            index={paging.index}
                            max={dataCategory.dataGetCountPaging?.data || 0}
                            onClickPrev={handleClickPrev}
                            onClickNext={handleClickNext}
                            onclickNumber={handleClickNumber}
                        ></PaginationControl>
                    </div>
                </div>
            </main>
            {describe && describe.isShow && <Describe onClose={handleClose} data={describe.describe} />}
        </>
    );
}

export default CategoryPage;
