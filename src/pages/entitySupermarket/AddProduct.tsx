import { Outlet } from 'react-router';

function AddProduct() {
    return (
        <>
            {' '}
            <main>
                <div className="container-fluid">
                    <h2 className="mt-30 page-title">Products</h2>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item">
                            <a href="index.html">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="products.html">Products</a>
                        </li>
                        <li className="breadcrumb-item active">Add Product</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2">
                                    <h4>Add New Product</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="news-content-right pd-20">
                                        <div className="form-group">
                                            <label className="form-label">Name*</label>
                                            <input type="text" className="form-control" placeholder="Category Name" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Category*</label>
                                            <select id="categtory" name="categtory" className="form-control">
                                                <option selected>--Select Category--</option>
                                                <option value="1">Fruits & Vegetables</option>
                                                <option value="2">Grocery & Staples</option>
                                                <option value="3">Dairy & Eggs</option>
                                                <option value="4">Beverages</option>
                                                <option value="5">Snacks</option>
                                                <option value="6">Home Care</option>
                                                <option value="7">Noodles & Sauces</option>
                                                <option value="8">Personal Care</option>
                                                <option value="9">Pet Care</option>
                                                <option value="10">Meat & Seafood</option>
                                                <option value="11">Electronics</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">MRP*</label>
                                            <input type="text" className="form-control" placeholder="$0" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Discount MRP*</label>
                                            <input type="text" className="form-control" placeholder="$0" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Status*</label>
                                            <select id="status" name="status" className="form-control">
                                                <option selected>Active</option>
                                                <option value="1">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Description*</label>
                                            <div className="card card-editor">
                                                <div className="content-editor">
                                                    <div id="pd_editor"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Category Image*</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        className="custom-file-input"
                                                        id="inputGroupFile04"
                                                        aria-describedby="inputGroupFileAddon04"
                                                    />
                                                    <label className="custom-file-label" htmlFor="inputGroupFile04">
                                                        Choose Image
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="add-cate-img-1">
                                                <img src="images/product/img-11.jpg" alt="" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">More Image*</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        className="custom-file-input"
                                                        id="inputGroupFile05"
                                                        aria-describedby="inputGroupFileAddon05"
                                                    />
                                                    <label className="custom-file-label" htmlFor="inputGroupFile05">
                                                        Choose Image
                                                    </label>
                                                </div>
                                            </div>
                                            <ul className="add-produc-imgs">
                                                <li>
                                                    <div className="add-cate-img-1">
                                                        <img src="images/product/big-1.jpg" alt="" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="add-cate-img-1">
                                                        <img src="images/product/big-2.jpg" alt="" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="add-cate-img-1">
                                                        <img src="images/product/big-3.jpg" alt="" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="add-cate-img-1">
                                                        <img src="images/product/big-4.jpg" alt="" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <button className="save-btn hover-btn" type="submit">
                                            Add New Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Outlet></Outlet>
        </>
    );
}

export default AddProduct;
