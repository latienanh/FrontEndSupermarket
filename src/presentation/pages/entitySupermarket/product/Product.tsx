import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { ProductService } from '~/application/redux/slide/ProductSlide';
import { ProductUnit } from '~/domain/entities/supermarketEntities/Product';
import { ButtonCustome, Describe, PaginationControl } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
    const [openRows, setOpenRows] = useState<boolean[]>([]); // Lưu trạng thái mở/đóng của từng hàng
    const handleRowClick = (index: number) => {
        setOpenRows((prev) => {
            const newOpenRows = [...prev];
            newOpenRows[index] = !newOpenRows[index]; // Chuyển trạng thái mở/đóng của hàng cụ thể
            return newOpenRows;
        });
    };
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
                    <h2 className="mt-30 page-title">Sản phẩm</h2>
                    <div className="row justify-content-between">
                        <div className="col-lg-12">
                            <Link to={URL_APP.AddProduct} className="add-btn hover-btn">
                                Thêm mới sản phẩm
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
                                    <h4>Tất cả sản phẩm</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="table-responsive">
                                        <TableContainer component={Paper}>
                                            <Table aria-label="collapsible table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell />
                                                        <TableCell>STT</TableCell>
                                                        <TableCell align="center">Tên sản phẩm</TableCell>
                                                        <TableCell align="center">Barcode</TableCell>
                                                        <TableCell align="center">Mô tả</TableCell>
                                                        <TableCell align="center">Số lượng</TableCell>
                                                        <TableCell align="center">Loại</TableCell>
                                                        <TableCell align="center">Đơn vị:Giá</TableCell>
                                                        <TableCell align="center">Ảnh</TableCell>
                                                        <TableCell align="center">Hành động</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {productState.dataGetPagingProduct.DataSuccess?.listData &&
                                                        productState.dataGetPagingProduct.DataSuccess?.listData.data
                                                            .length > 0 &&
                                                        productState.dataGetPagingProduct.DataSuccess?.listData.data.map(
                                                            (item, index) => {
                                                                return (
                                                                    <>
                                                                        <TableRow
                                                                            sx={{ '& > *': { borderBottom: 'unset' } }}
                                                                        >
                                                                            <TableCell>
                                                                                <IconButton
                                                                                    aria-label="expand row"
                                                                                    size="small"
                                                                                    onClick={() =>
                                                                                        handleRowClick(index)
                                                                                    }
                                                                                >
                                                                                    {openRows[index] ? (
                                                                                        <KeyboardArrowUpIcon />
                                                                                    ) : (
                                                                                        <KeyboardArrowDownIcon />
                                                                                    )}
                                                                                </IconButton>
                                                                            </TableCell>
                                                                            <TableCell component="th" scope="row">
                                                                                {index + 1 + paging.index * paging.size}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {item.name}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {item.barCode}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {' '}
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
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {item.mainQuantity}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {item.productUnits?.map(
                                                                                    (
                                                                                        itemProductUnit: ProductUnit,
                                                                                        index: number,
                                                                                    ) => (
                                                                                        <span
                                                                                            key={index}
                                                                                            className="badge-item badge-status m-1"
                                                                                        >
                                                                                            {itemProductUnit.unit
                                                                                                ?.unitName ||
                                                                                                'N/A'}{' '}
                                                                                            :
                                                                                            {itemProductUnit.prices?.map(
                                                                                                (p, priceIndex) => (
                                                                                                    <span
                                                                                                        key={priceIndex}
                                                                                                    >
                                                                                                        {p.salePrice ||
                                                                                                            '0'}
                                                                                                    </span>
                                                                                                ),
                                                                                            )}
                                                                                        </span>
                                                                                    ),
                                                                                )}
                                                                            </TableCell>

                                                                            <TableCell align="center">
                                                                                {item.slug}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <img
                                                                                    className="cate-img "
                                                                                    src={`${IMG_URL}${item.image}`}
                                                                                    alt=""
                                                                                    style={{ width: 50, height: 50 }}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell align="center">
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
                                                                                            handleDeleteCategory(
                                                                                                item.id,
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Delete Category
                                                                                    </a>
                                                                                </div>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell
                                                                                style={{
                                                                                    paddingBottom: 0,
                                                                                    paddingTop: 0,
                                                                                }}
                                                                                colSpan={6}
                                                                            >
                                                                                <Collapse
                                                                                    in={openRows[index]}
                                                                                    timeout="auto"
                                                                                    unmountOnExit
                                                                                >
                                                                                    <Box sx={{ margin: 1 }}>
                                                                                        <Typography
                                                                                            variant="h6"
                                                                                            gutterBottom
                                                                                            component="div"
                                                                                        >
                                                                                            Sản phẩm biến thể
                                                                                        </Typography>
                                                                                        <Table
                                                                                            size="medium"
                                                                                            aria-label="purchases"
                                                                                        >
                                                                                            <TableHead>
                                                                                                <TableRow>
                                                                                                    <TableCell>
                                                                                                        STT
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Tên sản phẩm
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Barcode
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Mô tả
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Số lượng
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Loại
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Đơn vị:Giá
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Ảnh
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Hành động
                                                                                                    </TableCell>
                                                                                                </TableRow>
                                                                                            </TableHead>
                                                                                            <TableBody>
                                                                                                {item.variants !=
                                                                                                    null &&
                                                                                                    item.variants.map(
                                                                                                        (
                                                                                                            itemVariant,
                                                                                                            index,
                                                                                                        ) => (
                                                                                                            <TableRow
                                                                                                                key={
                                                                                                                    index
                                                                                                                }
                                                                                                            >
                                                                                                                <TableCell
                                                                                                                    component="th"
                                                                                                                    scope="row"
                                                                                                                    align="center"
                                                                                                                >
                                                                                                                    {index +
                                                                                                                        1}
                                                                                                                </TableCell>
                                                                                                                <TableCell
                                                                                                                    component="th"
                                                                                                                    scope="row"
                                                                                                                    align="center"
                                                                                                                >
                                                                                                                    {
                                                                                                                        itemVariant.name
                                                                                                                    }
                                                                                                                    {itemVariant.variantValues.map(
                                                                                                                        (
                                                                                                                            itemVariantValue,
                                                                                                                        ) => {
                                                                                                                            return (
                                                                                                                                <>
                                                                                                                                    {
                                                                                                                                        '-'
                                                                                                                                    }
                                                                                                                                    <span className="badge-item badge-status m-1">
                                                                                                                                        {
                                                                                                                                            itemVariantValue.attributeValueName
                                                                                                                                        }
                                                                                                                                    </span>
                                                                                                                                </>
                                                                                                                            );
                                                                                                                        },
                                                                                                                    )}
                                                                                                                </TableCell>
                                                                                                                <TableCell
                                                                                                                    component="th"
                                                                                                                    scope="row"
                                                                                                                    align="center"
                                                                                                                >
                                                                                                                    {
                                                                                                                        itemVariant.barCode
                                                                                                                    }
                                                                                                                </TableCell>
                                                                                                                <TableCell align="center">
                                                                                                                    <ButtonCustome
                                                                                                                        Title="Xem"
                                                                                                                        BackgroundColor="#3caffb"
                                                                                                                        HoverColor="#2a7aaf"
                                                                                                                        onClick={() => {
                                                                                                                            // handleShow();
                                                                                                                            setDescribe(
                                                                                                                                (
                                                                                                                                    prev,
                                                                                                                                ) => ({
                                                                                                                                    ...prev,
                                                                                                                                    isShow: true,
                                                                                                                                    describe:
                                                                                                                                        itemVariant.describe ||
                                                                                                                                        'Chưa có gì',
                                                                                                                                }),
                                                                                                                            );
                                                                                                                        }}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell
                                                                                                                    component="th"
                                                                                                                    scope="row"
                                                                                                                    align="center"
                                                                                                                >
                                                                                                                    {
                                                                                                                        itemVariant.mainQuantity
                                                                                                                    }
                                                                                                                </TableCell>
                                                                                                                <TableCell
                                                                                                                    component="th"
                                                                                                                    scope="row"
                                                                                                                    align="center"
                                                                                                                >
                                                                                                                    {itemVariant.categories?.map(
                                                                                                                        (
                                                                                                                            itemCategory: any,
                                                                                                                            index: number,
                                                                                                                        ) => {
                                                                                                                            return (
                                                                                                                                <span
                                                                                                                                    key={
                                                                                                                                        index
                                                                                                                                    }
                                                                                                                                    className="badge-item badge-status m-1"
                                                                                                                                >
                                                                                                                                    {
                                                                                                                                        itemCategory.name
                                                                                                                                    }
                                                                                                                                </span>
                                                                                                                            );
                                                                                                                        },
                                                                                                                    )}
                                                                                                                </TableCell>
                                                                                                                <TableCell
                                                                                                                    component="th"
                                                                                                                    scope="row"
                                                                                                                    align="center"
                                                                                                                >
                                                                                                                    {itemVariant.productUnits?.map(
                                                                                                                        (
                                                                                                                            itemProductUnit: ProductUnit,
                                                                                                                            index: number,
                                                                                                                        ) => {
                                                                                                                            return (
                                                                                                                                <span
                                                                                                                                    key={
                                                                                                                                        index
                                                                                                                                    }
                                                                                                                                    className="badge-item badge-status m-1"
                                                                                                                                >
                                                                                                                                    {
                                                                                                                                        itemProductUnit
                                                                                                                                            .unit
                                                                                                                                            .unitName
                                                                                                                                    }

                                                                                                                                    :
                                                                                                                                    {itemProductUnit.prices.map(
                                                                                                                                        (
                                                                                                                                            p,
                                                                                                                                        ) =>
                                                                                                                                            p.salePrice,
                                                                                                                                    )}
                                                                                                                                </span>
                                                                                                                            );
                                                                                                                        },
                                                                                                                    )}
                                                                                                                </TableCell>
                                                                                                                <TableCell
                                                                                                                    component="th"
                                                                                                                    scope="row"
                                                                                                                    align="center"
                                                                                                                >
                                                                                                                    <img
                                                                                                                        className="cate-img "
                                                                                                                        src={`${IMG_URL}${itemVariant.image}`}
                                                                                                                        alt=""
                                                                                                                        style={{
                                                                                                                            width: 50,
                                                                                                                            height: 50,
                                                                                                                        }}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell
                                                                                                                    component="th"
                                                                                                                    scope="row"
                                                                                                                    align="center"
                                                                                                                >
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
                                                                                                                            to={`${URL_APP.UpdateCategory}/${itemVariant.id}`}
                                                                                                                        >
                                                                                                                            Edit
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
                                                                                                                            Delete
                                                                                                                            Category
                                                                                                                        </a>
                                                                                                                    </div>
                                                                                                                </TableCell>
                                                                                                            </TableRow>
                                                                                                        ),
                                                                                                    )}
                                                                                            </TableBody>
                                                                                        </Table>
                                                                                    </Box>
                                                                                </Collapse>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </>
                                                                );
                                                            },
                                                        )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
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
