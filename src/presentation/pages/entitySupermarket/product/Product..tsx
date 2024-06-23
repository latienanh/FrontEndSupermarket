function Product() {
    return (
        <main>
            <div className="container-fluid">
                <h2 className="mt-30 page-title">Products</h2>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">
                        <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Products</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        <a href="add_product.html" className="add-btn hover-btn">
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
                                        Search Area
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2 pb-3">
                                <h4>All Areas</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '60px' }}>
                                                    <input type="checkbox" className="check-all" />
                                                </th>
                                                <th style={{ width: '60px' }}>ID</th>
                                                <th style={{ width: '100px' }}>Image</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Created</th>
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
                                                        value="10"
                                                    />
                                                </td>
                                                <td>1</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-1.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td>Vegetables &amp; Fruits</td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
                                                        <i className="fas fa-edit"></i>
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
                                                <td>2</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-10.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td> Dairy &amp; Eggs </td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
                                                        <i className="fas fa-edit"></i>
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
                                                <td>3</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-3.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td>Vegetables &amp; Fruits</td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
                                                        <i className="fas fa-edit"></i>
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
                                                <td>4</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-4.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td>Vegetables &amp; Fruits</td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
                                                        <i className="fas fa-edit"></i>
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
                                                <td>5</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-15.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td>Dairy & Eggs</td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
                                                        <i className="fas fa-edit"></i>
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
                                                <td>6</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-6.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td>Vegetables &amp; Fruits</td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
                                                        <i className="fas fa-edit"></i>
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
                                                <td>7</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-7.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td>Vegetables &amp; Fruits</td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
                                                        <i className="fas fa-edit"></i>
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
                                                <td>8</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-8.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td>Vegetables &amp; Fruits</td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
                                                        <i className="fas fa-edit"></i>
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
                                                <td>9</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-9.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td>Vegetables &amp; Fruits</td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
                                                        <i className="fas fa-edit"></i>
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
                                                <td>10</td>
                                                <td>
                                                    <div className="cate-img-5">
                                                        <img src="images/product/img-14.jpg" alt="" />
                                                    </div>
                                                </td>
                                                <td>Product Name Here</td>
                                                <td>Vegetables &amp; Fruits</td>
                                                <td>8 hours ago</td>
                                                <td>
                                                    <span className="badge-item badge-status">Active</span>
                                                </td>
                                                <td className="action-btns">
                                                    <a href="product_view.html" className="view-shop-btn" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    <a href="#" className="edit-btn" title="Edit">
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
        </main>
    );
}

export default Product;
