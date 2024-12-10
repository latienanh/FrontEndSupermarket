import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { CategoryService } from '~/application/redux/slide/CategorySlide';
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
function CategoryPage() {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const dispatch = useDispatch<AppDispatch>();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const [describe, setDescribe] = useState<ShowDescribe>({
        describe: '',
        isShow: false,
    });
    const [open, setOpen] = useState(false);
    const [openRows, setOpenRows] = useState<boolean[]>([]); // Lưu trạng thái mở/đóng của từng hàng
    const handleRowClick = (index: number) => {
        setOpenRows((prev) => {
            const newOpenRows = [...prev];
            newOpenRows[index] = !newOpenRows[index]; // Chuyển trạng thái mở/đóng của hàng cụ thể
            return newOpenRows;
        });
    };
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
            if (dataCategory.dataGetPagingCategory.DataSuccess?.listData?.totalPage) {
                if (tempindex < dataCategory.dataGetPagingCategory.DataSuccess?.listData?.totalPage - 1)
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
                    <h2 className="mt-30 page-title">Loại sản phẩm</h2>
                    <div className="row justify-content-between">
                        <div className="col-lg-12">
                            <Link to={URL_APP.AddCategory} className="add-btn hover-btn">
                                'Thêm mới sản phẩm'
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
                                        <TableContainer component={Paper}>
                                            <Table aria-label="collapsible table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell />
                                                        <TableCell>STT</TableCell>
                                                        <TableCell align="center">Tên sản phẩm</TableCell>
                                                        <TableCell align="center">Ảnh</TableCell>
                                                        <TableCell align="center">Mô tả</TableCell>
                                                        <TableCell align="center">Hành động</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {dataCategory.dataGetPagingCategory.DataSuccess?.listData &&
                                                        dataCategory.dataGetPagingCategory.DataSuccess?.listData.data
                                                            .length > 0 &&
                                                        dataCategory.dataGetPagingCategory.DataSuccess?.listData.data.map(
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
                                                                                <img
                                                                                    className="cate-img "
                                                                                    src={`${IMG_URL}${item.image}`}
                                                                                    alt=""
                                                                                    style={{ width: 50, height: 50 }}
                                                                                />
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
                                                                                            size="small"
                                                                                            aria-label="purchases"
                                                                                        >
                                                                                            <TableHead>
                                                                                                <TableRow>
                                                                                                    <TableCell align="center">
                                                                                                        STT
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Tên sản phẩm
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Ảnh
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Mô tả
                                                                                                    </TableCell>
                                                                                                    <TableCell align="center">
                                                                                                        Hành động
                                                                                                    </TableCell>
                                                                                                </TableRow>
                                                                                            </TableHead>
                                                                                            <TableBody>
                                                                                                {item.categoryChildren !=
                                                                                                    null &&
                                                                                                    item.categoryChildren.map(
                                                                                                        (
                                                                                                            itemchi,
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
                                                                                                                        itemchi.name
                                                                                                                    }
                                                                                                                </TableCell>
                                                                                                                <TableCell align="center">
                                                                                                                    <img
                                                                                                                        className="cate-img "
                                                                                                                        src={`${IMG_URL}${itemchi.image}`}
                                                                                                                        alt=""
                                                                                                                        style={{
                                                                                                                            width: 50,
                                                                                                                            height: 50,
                                                                                                                        }}
                                                                                                                    />
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
                                                                                                                                        itemchi.describe ||
                                                                                                                                        'Chưa có gì',
                                                                                                                                }),
                                                                                                                            );
                                                                                                                        }}
                                                                                                                        Icon=" fa-regular fa-eye"
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
                            max={dataCategory.dataGetPagingCategory.DataSuccess?.listData?.totalPage || 0}
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
