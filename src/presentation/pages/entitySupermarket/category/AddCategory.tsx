function AddCategory() {
    return (
        <main>
            <div className="container-fluid">
                <h2 className="mt-30 page-title">Categories</h2>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">
                        <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="category.html">Categories</a>
                    </li>
                    <li className="breadcrumb-item active">Add Category</li>
                </ol>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add New Category</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Name*</label>
                                        <input type="text" className="form-control" placeholder="Category Name" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Status*</label>
                                        <select id="status" name="status" className="form-control">
                                            <option selected>Active</option>
                                            <option value="1">Inactive</option>
                                        </select>
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
                                        <div className="add-cate-img">
                                            <img src="images/category/icon-1.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Description*</label>
                                        <div className="card card-editor">
                                            <div className="content-editor">
                                                <textarea
                                                    className="text-control"
                                                    placeholder="Enter Description"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="save-btn hover-btn" type="submit">
                                        Add New Category
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AddCategory;
