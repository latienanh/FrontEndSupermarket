import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { URL_APP } from '~/presentation/router/Link';
import { ButtonCustome, Describe, PaginationControl } from '~/presentation/components/share';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { ProductService } from '~/application/redux/slide/ProductSlide';
import { ProductUnit } from '~/domain/entities/supermarketEntities/Product';

type ShowDescribe = {
    isShow: boolean;
    describe: string;
};

function ProductPage() {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const dispatch = useDispatch<AppDispatch>();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const [describe, setDescribe] = useState<ShowDescribe>({
        describe: '',
        isShow: false,
    });
    console.log(describe);
    const productState = useSelector((state: RootState) => state.product);
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
                dispatch(ProductService.fetchDelete(id));
                setHasEditDataChanged(true);
            }
        });
    };
    const handleClickNext = () => {
        setPaging((prev) => {
            const tempindex = prev.index;
            if (productState.dataGetPagingProduct.DataSuccess?.listData.totalPage) {
                if (tempindex < productState.dataGetPagingProduct.DataSuccess?.listData.totalPage - 1)
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
        dispatch(ProductService.fetchGetPaging(paging));
    }, []);
    useEffect(() => {
        dispatch(ProductService.fetchGetPaging(paging));
    }, [paging]);
    useEffect(() => {
        if (productState.dataDelete) {
            if (hasEditDataChanged) {
                Swal.fire({
                    title: 'Deleted!',
                    text: `${productState.dataDelete?.message}`,
                    icon: 'success',
                });
            }

            dispatch(ProductService.fetchGetPaging(paging));
            setPaging((prev) => {
                return {
                    ...prev,
                    index: 0,
                };
            });
        } else if (!productState.isLoading && productState.isError) {
            toast.error('Có lỗi xảy ra khi xoá');
        }
    }, [productState.dataDelete]);
    return (
        <>
            {' '}
            <main>
                <div className="container-fluid">
                    <h2 className="mt-30 page-title">Product</h2>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item">
                            <a href="index.html">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">Product</li>
                    </ol>
                    <div className="row justify-content-between">
                        <div className="col-lg-12">
                            <Link to={URL_APP.AddProduct} className="add-btn hover-btn">
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
                                    <h4>All Product</h4>
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
                                                    {/* <th>ID</th> */}
                                                    <th>Name</th>
                                                    <th>Barcode</th>
                                                    <th>Mô tả</th>
                                                    <th>Số lượng</th>
                                                    <th>Giá bán</th>

                                                    <th>Category</th>
                                                    <th>Slug</th>
                                                    <th>Ảnh</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productState.dataGetPagingProduct.DataSuccess?.listData &&
                                                    productState.dataGetPagingProduct.DataSuccess?.listData.data
                                                        .length > 0 &&
                                                    productState.dataGetPagingProduct.DataSuccess?.listData.data.map(
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
                                                                        {/* <td>{item.id}</td> */}
                                                                        <td>{item.name}</td>
                                                                        <td>{item.barCode}</td>
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
                                                                        <td>{item.quantity}</td>
                                                                        <td>{item.price + ' VNĐ'}</td>
                                                                        <td>
                                                                            {item.categories?.map(
                                                                                (itemCategory: any, index: number) => {
                                                                                    return (
                                                                                        <span
                                                                                            key={index}
                                                                                            className="badge-item badge-status m-1"
                                                                                        >
                                                                                            {itemCategory.name}
                                                                                        </span>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {item.productUnits?.map(
                                                                                (
                                                                                    itemProductUnit: ProductUnit,
                                                                                    index: number,
                                                                                ) => {
                                                                                    return (
                                                                                        <span
                                                                                            key={index}
                                                                                            className="badge-item badge-status m-1"
                                                                                        >
                                                                                            {
                                                                                                itemProductUnit.unit
                                                                                                    .unitName
                                                                                            }
                                                                                            {itemProductUnit.prices.map(
                                                                                                (p) => p.salePrice,
                                                                                            )}
                                                                                        </span>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </td>
                                                                        <td>{item.slug}</td>
                                                                        <td>
                                                                            <img
                                                                                className="cate-img "
                                                                                src={`${IMG_URL}${item.image}`}
                                                                                alt=""
                                                                                style={{ width: 50, height: 50 }}
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
                                                                                    to={`${URL_APP.UpdateProduct}/${item.id}`}
                                                                                >
                                                                                    Sửa sản phẩm
                                                                                </Link>
                                                                                <div className="dropdown-divider"></div>
                                                                                <a
                                                                                    className="dropdown-item text-danger"
                                                                                    onClick={() => {
                                                                                        handleDeleteCategory(item.id);
                                                                                    }}
                                                                                >
                                                                                    Xoá sản phẩm
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    {item.variants != null &&
                                                                        item.variants.map((itemVariant, index) => {
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
                                                                                    {/* <td>{itemVariant.id}</td> */}
                                                                                    <td>
                                                                                        {itemVariant.name}
                                                                                        {itemVariant.variantValues.map(
                                                                                            (itemVariantValue) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        {'-'}
                                                                                                        <span className="badge-item badge-status m-1">
                                                                                                            {
                                                                                                                itemVariantValue.attributeValueName
                                                                                                            }
                                                                                                        </span>
                                                                                                    </>
                                                                                                );
                                                                                            },
                                                                                        )}
                                                                                    </td>
                                                                                    <td>{itemVariant.barCode}</td>
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
                                                                                                        itemVariant.describe ||
                                                                                                        'Chưa có gì',
                                                                                                }));
                                                                                            }}
                                                                                            Icon=" fa-regular fa-eye"
                                                                                        />
                                                                                    </td>
                                                                                    <td>{itemVariant.quantity}</td>
                                                                                    <td>
                                                                                        {itemVariant.price + ' VNĐ'}
                                                                                    </td>
                                                                                    <td>
                                                                                        {itemVariant.categories?.map(
                                                                                            (
                                                                                                itemCategory: any,
                                                                                                index: number,
                                                                                            ) => {
                                                                                                return (
                                                                                                    <span
                                                                                                        key={index}
                                                                                                        className="badge-item badge-status m-1"
                                                                                                    >
                                                                                                        {
                                                                                                            itemCategory.name
                                                                                                        }
                                                                                                    </span>
                                                                                                );
                                                                                            },
                                                                                        )}
                                                                                    </td>
                                                                                    <td>{itemVariant.slug}</td>
                                                                                    <td>
                                                                                        {itemVariant.productUnits?.map(
                                                                                            (
                                                                                                itemProductUnit: ProductUnit,
                                                                                                index: number,
                                                                                            ) => {
                                                                                                return (
                                                                                                    <span
                                                                                                        key={index}
                                                                                                        className="badge-item badge-status m-1"
                                                                                                    >
                                                                                                        {
                                                                                                            itemProductUnit
                                                                                                                .unit
                                                                                                                .unitName
                                                                                                        }
                                                                                                        {itemProductUnit.prices.map(
                                                                                                            (p) =>
                                                                                                                p.salePrice,
                                                                                                        )}
                                                                                                    </span>
                                                                                                );
                                                                                            },
                                                                                        )}
                                                                                    </td>
                                                                                    <td>
                                                                                        <img
                                                                                            className="cate-img "
                                                                                            src={`${IMG_URL}${itemVariant.image}`}
                                                                                            alt=""
                                                                                            style={{
                                                                                                width: 50,
                                                                                                height: 50,
                                                                                            }}
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
                                                                                                to={`${URL_APP.UpdateProduct}/${itemVariant.id}`}
                                                                                            >
                                                                                                Sửa biến thể
                                                                                            </Link>
                                                                                            <div className="dropdown-divider"></div>
                                                                                            <a
                                                                                                className="dropdown-item text-danger"
                                                                                                onClick={() => {
                                                                                                    handleDeleteCategory(
                                                                                                        itemVariant.id,
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                Xoá biến thể
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
                            max={productState.dataGetPagingProduct.DataSuccess?.listData.totalPage || 0}
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

export default ProductPage;
