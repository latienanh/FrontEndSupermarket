function ProductDetail() {
    return (
        <main>
            <div className="container-fluid">
                <h2 className="mt-30 page-title">Shops</h2>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">
                        <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="shops.html">Shops</a>
                    </li>
                    <li className="breadcrumb-item active">Shop view</li>
                </ol>
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <div className="card card-static-2 mb-30">
                            <div className="card-body-table pt-4">
                                <div className="shopowner-content-left text-center pd-20">
                                    <div className="shop_img">
                                        <img src="images/product/img-1.jpg" alt="" />
                                    </div>
                                    <ul className="product-dt-purchases">
                                        <li>
                                            <div className="product-status">
                                                Orders <span className="badge-item-2 badge-status">10</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="product-status">
                                                Shop <span className="badge-item-2 badge-status">2</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="shopowner-dts">
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Price</span>
                                            <span className="right-dt">$15</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Status</span>
                                            <span className="right-dt">Active</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Created</span>
                                            <span className="right-dt">5 May 2020, 03.45 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;
