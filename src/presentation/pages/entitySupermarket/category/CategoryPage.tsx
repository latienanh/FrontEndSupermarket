import { fetchAllCategories } from '~/application/redux/slide/CategorySlide';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { useEffect } from 'react';
function CategoryPage() {
    const dispatch = useDispatch<AppDispatch>();
    const listCategories = useSelector((state: RootState) => state.category.listCategories);
    const isLoading = useSelector((state: RootState) => state.category.isLoading);
    const isError = useSelector((state: RootState) => state.category.isError);
    useEffect(() => {
        dispatch(fetchAllCategories());
    }, []);
    console.log(listCategories);
    return (
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
                        <a href="add_category.html" className="add-btn hover-btn">
                            Add New
                        </a>
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
                                <h4>All Categories</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="checkbox" className="check-all" />
                                                </th>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Bố</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCategories &&
                                                listCategories.length > 0 &&
                                                listCategories.map((item, index) => {
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
                                                            {/* <td>
                                                                <div className="cate-img">
                                                                    <img src="images/category/icon-1.svg" alt="" />
                                                                </div>
                                                            </td> */}
                                                            <td>{item.id}</td>
                                                            <td>{item.categoryName}</td>
                                                            <td>{item.parentId ?? 'không có'}</td>
                                                            {/* <td>
                                                                <span className="badge-item badge-status">Active</span>
                                                            </td> */}
                                                            <td className="action-btns">
                                                                <a href="#" className="edit-btn">
                                                                    <i className="fas fa-edit"></i> Edit
                                                                </a>
                                                            </td>
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
            <div className="card-footer border-top d-flex justify-content-center">
                <button
                    className="btn btn-falcon-default btn-sm me-2"
                    type="button"
                    // disabled="disabled"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Prev"
                >
                    <span className="fas fa-chevron-left"></span>
                </button>
                <a className="btn btn-sm btn-falcon-default text-primary me-2" href="#!">
                    1
                </a>
                <a className="btn btn-sm btn-falcon-default me-2" href="#!">
                    2
                </a>
                <a className="btn btn-sm btn-falcon-default me-2" href="#!">
                    <span className="fas fa-ellipsis-h"></span>
                </a>
                <a className="btn btn-sm btn-falcon-default me-2" href="#!">
                    35
                </a>
                <button
                    className="btn btn-falcon-default btn-sm"
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Next"
                >
                    <span className="fas fa-chevron-right"></span>
                </button>
            </div>
        </main>
    );
}

export default CategoryPage;
