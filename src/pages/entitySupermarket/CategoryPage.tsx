function CategoryPage() {
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
                    <div className="col-lg-3 col-md-4">
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
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="bulk-section mt-30">
                            <div className="search-by-name-input">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <div className="input-group">
                                <select id="categeory" name="categeory" className="form-control">
                                    <option selected>Active</option>
                                    <option value="1">Inactive</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">
                                        Search Category
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Categories</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                {/* <th style="width:60px"><input type="checkbox" className="check-all"></th>
                                            <th style="width:60px">ID</th>
                                            <th style="width:130px">Image</th> */}
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="11"
                                                    />
                                                </td>
                                                <td>1</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-1.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Fruits and Vegetables</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="10"
                                                    />
                                                </td>
                                                <td>2</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-2.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Grocery & Staples</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="9"
                                                    />
                                                </td>
                                                <td>3</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-3.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Dairy & Eggs</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="8"
                                                    />
                                                </td>
                                                <td>4</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-4.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Beverages</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="7"
                                                    />
                                                </td>
                                                <td>5</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-5.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Snacks</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="6"
                                                    />
                                                </td>
                                                <td>6</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-6.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Home Care</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="5"
                                                    />
                                                </td>
                                                <td>7</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-7.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Noodles & Sauces</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="4"
                                                    />
                                                </td>
                                                <td>8</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-8.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Personal Care</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="3"
                                                    />
                                                </td>
                                                <td>9</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-9.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Pet Care</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="2"
                                                    />
                                                </td>
                                                <td>10</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-10.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Meat & Seafood</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="check-item"
                                                        name="ids[]"
                                                        value="1"
                                                    />
                                                </td>
                                                <td>11</td>
                                                <td>
                                                    <div className="cate-img">
                                                        <img src="images/category/icon-11.svg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Electronics</td>
                                                <td></td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="#" className="edit-btn">
                                                        <i className="fas fa-edit"></i> Edit
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
