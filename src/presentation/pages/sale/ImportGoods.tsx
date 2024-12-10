import { Autocomplete, Box, Input, Stack, TableCell, TableRow, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { TableComponents, TableVirtuoso } from 'react-virtuoso';
import { ErrorStockInDetailView, ErrorStockInView } from '~/application/model/modelErrorRequest/ErrorEntity';
import { StockInDetailView, StockInView } from '~/application/model/modelView/ImportGoodsModelView';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { EmployeeService } from '~/application/redux/slide/EmployeeSlide';
import { ImportGoodsService } from '~/application/redux/slide/ImportGoodsSlide';
import { ProductService } from '~/application/redux/slide/ProductSlide';
import { SupplierService } from '~/application/redux/slide/SupplierSlide';
import Employee from '~/domain/entities/supermarketEntities/Employee';
import { Product } from '~/domain/entities/supermarketEntities/Product';
import Supplier from '~/domain/entities/supermarketEntities/Supplier';
import { ButtonCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';

interface ColumnStockInDetail {
    dataKey: keyof StockInDetailView;
    label: string;
    numeric?: boolean;
    width: number;
}
const ColumnStockInDetails: ColumnStockInDetail[] = [
    {
        width: 150,
        label: 'Tên',
        dataKey: 'name',
    },
    {
        width: 120,
        label: 'Giá bán',
        dataKey: 'price',
        numeric: true,
    },
    {
        width: 120,
        label: 'Số lượng trong kho',
        dataKey: 'quantityProduct',
        numeric: true,
    },
    {
        width: 120,
        label: 'Giá nhập',
        dataKey: 'unitPriceReceived',
        numeric: true,
    },
    {
        width: 120,
        label: 'Số lượng nhập',
        dataKey: 'quantityReceived',
        numeric: true,
    },
];
const CustomTableHead = React.forwardRef<HTMLTableSectionElement, any>((props, ref) => {
    return <thead ref={ref} {...props} />;
});
const VirtuosoTableComponents: TableComponents<StockInDetailView> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
    TableHead: CustomTableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {ColumnStockInDetails.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function ImportGoods() {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const importGoodsState = useSelector((state: RootState) => state.importGoods);
    const productState = useSelector((state: RootState) => state.product);
    const supplierState = useSelector((state: RootState) => state.supplier);
    const employeeState = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch<AppDispatch>();
    const [stockInAdd, setStockInAdd] = useState<StockInView>({
        supplier: null,
        employee: null,
        note: '',
        stockInDetails: [],
    });
    const [errors, setErrors] = useState<ErrorStockInView>({});

    useEffect(() => {
        dispatch(SupplierService.fetchGetAll());
        dispatch(ProductService.fetchGetAll());
        dispatch(EmployeeService.fetchGetAll());
    }, []);
    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };
    const handlestockInDetailError = (errorMessage: string | null, input: string, index: number) => {
        setErrors((prevState) => {
            const errorStockInDetail = prevState.stockInDetails?.map((stockInDetail, i) => {
                // console.log(i);
                if (i === index) {
                    return {
                        ...stockInDetail,
                        [input]: errorMessage,
                    };
                }
                return stockInDetail;
            });

            return {
                ...prevState,
                stockInDetails: errorStockInDetail || [],
            };
        });
    };
    const validate = () => {
        let isValid = true;
        if (!stockInAdd?.supplier) {
            handleError('Vui lòng chưa chọn nhà cung cấp !', 'supplier');
            isValid = false;
        }
        if (!stockInAdd?.employee) {
            handleError('Chưa chọn nhân viên !', 'employee');
            isValid = false;
        }
        if (stockInAdd.stockInDetails.length <= 0) {
            handleError('Chưa chọn sản phẩm', 'stockInDetail');
            isValid = false;
        }
        if (stockInAdd.stockInDetails && stockInAdd.stockInDetails.length > 0) {
            stockInAdd.stockInDetails.forEach((item, index) => {
                if (!item?.unitPriceReceived) {
                    handlestockInDetailError('Vui lòng nhập giá !', 'unitPriceReceived', index);
                    isValid = false;
                } else if (item.unitPriceReceived > item.price) {
                    handlestockInDetailError('Giá nhập lớn giá bán rùi !', 'unitPriceReceived', index);
                    isValid = false;
                }
                if (!item?.quantityReceived) {
                    handlestockInDetailError('Vui lòng số lượng !', 'quantityReceived', index);
                    isValid = false;
                }
            });
        }
        if (isValid) {
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            const payload: StockInRequest = {
                supplierId: stockInAdd.supplier?.id || '',
                employeeId: stockInAdd.employee?.id || '',
                note: stockInAdd.note || 'Không có',
                stockInDetails: stockInAdd.stockInDetails.map((item) => ({
                    productId: item.productId,
                    quantityReceived: item.quantityReceived,
                    unitPriceReceived: item.unitPriceReceived,
                })),
            };
            dispatch(ImportGoodsService.fetchImportGoods(payload));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!importGoodsState.isLoading) {
            if (!importGoodsState.isError && importGoodsState.dataImportGoods) {
                if (hasEditDataChanged) {
                    toast.success(importGoodsState.dataImportGoods.message);
                    navigate(URL_APP.Products);
                }
            } else if (importGoodsState.isError && importGoodsState.dataImportGoods) {
                toast.error(importGoodsState.dataImportGoods.message);
            }
        }
    }, [importGoodsState.dataImportGoods]);

    const handleChangeSupplier = (event: any, newValue: Supplier | null) => {
        handleError('', 'supplier');
        if (newValue) {
            setStockInAdd((prev) => ({
                ...prev,
                supplier: newValue,
            }));
        } else {
            setStockInAdd((prev) => ({
                ...prev,
                supplier: null,
            }));
        }
    };
    const handleChangeEmployee = (event: any, newValue: Employee | null) => {
        handleError('', 'employee');
        if (newValue) {
            setStockInAdd((prev) => ({
                ...prev,
                employee: newValue,
            }));
        } else {
            setStockInAdd((prev) => ({
                ...prev,
                employee: null,
            }));
        }
    };
    const handleChangeProductQuantity = (event: any, index: number) => {
        handlestockInDetailError('', 'quantityReceived', index);
        // quantityReceived?: string;
        // unitPriceReceived?: string;
        setStockInAdd((prevState) => {
            const updatedStockInDetail = prevState.stockInDetails?.map((stockInDetail, i) => {
                if (i === index) {
                    return {
                        ...stockInDetail,
                        quantityReceived: parseFloat(event.target.value),
                    };
                }
                return stockInDetail;
            });

            return {
                ...prevState,
                stockInDetails: updatedStockInDetail || [],
            };
        });
    };
    const handleChangeProductPrice = (event: any, index: number) => {
        handlestockInDetailError('', 'unitPriceReceived', index);
        setStockInAdd((prevState) => {
            const updatedStockInDetail = prevState.stockInDetails?.map((stockInDetail, i) => {
                if (i === index) {
                    return {
                        ...stockInDetail,
                        unitPriceReceived: parseInt(event.target.value),
                    };
                }
                return stockInDetail;
            });

            return {
                ...prevState,
                stockInDetails: updatedStockInDetail || [],
            };
        });
    };
    const handleChangeProduct = (event: any, newValue: Product[] | null) => {
        handleError('', 'stockInDetail');
        if (newValue) {
            setStockInAdd((prevStockIn) => {
                let newStockInDetail: StockInDetailView[] = [];
                newValue.forEach((value) => {
                    newStockInDetail.push({
                        productId: value.id,
                        name: value.name,
                        quantityProduct: value.mainQuantity,
                        price: value.price,
                        quantityReceived: 0,
                        unitPriceReceived: 0,
                    });
                });
                return {
                    ...prevStockIn,
                    stockInDetails: newStockInDetail,
                };
            });
            setErrors((prevStockInDetail) => {
                let newErrorStockInDetail: ErrorStockInDetailView[] = [];
                newValue.forEach(() => {
                    newErrorStockInDetail.push({
                        quantityReceived: '',
                        unitPriceReceived: '',
                    });
                });
                return {
                    ...prevStockInDetail,
                    stockInDetails: newErrorStockInDetail,
                };
            });
        }
    };

    return (
        <>
            {' '}
            <main>
                <div className="container-fluid">
                    <h2 className="mt-30 page-title">Nhập hàng</h2>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item">
                            <a href="Sản phẩm.html">Nhập hàng</a>
                        </li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2 mb-3">
                                    <h4>Thông tin nhà cung cấp</h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="post-form">
                                        <Autocomplete
                                            id="select-supplier"
                                            // sx={{ width: 200 }}
                                            options={supplierState.dataGetAll.DataSuccess?.listData || []}
                                            autoHighlight
                                            getOptionLabel={(option) => option.name}
                                            onChange={handleChangeSupplier}
                                            renderOption={(props, option) => {
                                                const { key, ...optionProps } = props;
                                                return (
                                                    <Box
                                                        key={key}
                                                        component="li"
                                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                        {...optionProps}
                                                    >
                                                        <div>
                                                            <div>
                                                                <span>Tên NCC: {option.name} </span>
                                                            </div>
                                                            <div>
                                                                <span>SĐT :{option.phoneNumber}</span>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Chọn nhà cung cấp"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.supplier ? (
                                            <label className="bg text-danger">{errors.supplier}</label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="card card-static-2 mb-30">
                                <div className="card-title-2 mb-4">
                                    <h4>Sản phẩm nhập </h4>
                                </div>
                                <div className="card-body-table">
                                    <div className="post-form">
                                        <Stack
                                            spacing={3}
                                            // sx={{ width: 500 }}
                                        >
                                            <Autocomplete
                                                id="select-products"
                                                // sx={{ width: 200 }}
                                                multiple
                                                options={productState.dataGetAll.DataSuccess?.listData || []}
                                                autoHighlight
                                                getOptionLabel={(option) => option.name}
                                                onChange={handleChangeProduct}
                                                renderOption={(props, option) => {
                                                    const { key, ...optionProps } = props;
                                                    return (
                                                        <Box
                                                            key={key}
                                                            component="li"
                                                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                            {...optionProps}
                                                        >
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                src={`${IMG_URL}${option.image}`}
                                                                alt=""
                                                            />
                                                            <div>
                                                                <div>
                                                                    <span>Tên: {option.name} </span>
                                                                </div>
                                                                <div>
                                                                    <span
                                                                        className={
                                                                            option.mainQuantity < 10
                                                                                ? `text-danger`
                                                                                : ''
                                                                        }
                                                                    >
                                                                        Số lượng: {option.mainQuantity}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Box>
                                                    );
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Chọn sản phẩm nhập"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.stockInDetail ? (
                                                <label className="bg text-danger">{errors.stockInDetail}</label>
                                            ) : (
                                                ''
                                            )}
                                        </Stack>
                                        <Paper style={{ height: 400, width: '100%' }}>
                                            <TableVirtuoso
                                                data={stockInAdd.stockInDetails}
                                                components={VirtuosoTableComponents}
                                                fixedHeaderContent={fixedHeaderContent}
                                                itemContent={(_index: number, row: StockInDetailView) => {
                                                    return (
                                                        <React.Fragment>
                                                            {ColumnStockInDetails.map((column) => {
                                                                if (column.dataKey === 'quantityReceived') {
                                                                    return (
                                                                        <>
                                                                            <TableCell
                                                                                key={column.dataKey}
                                                                                align={
                                                                                    column.numeric || false
                                                                                        ? 'right'
                                                                                        : 'left'
                                                                                }
                                                                            >
                                                                                <Input
                                                                                    type="number"
                                                                                    defaultValue={row[column.dataKey]}
                                                                                    onChange={(event) =>
                                                                                        handleChangeProductQuantity(
                                                                                            event,
                                                                                            _index,
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {errors.stockInDetails &&
                                                                                errors.stockInDetails[_index] ? (
                                                                                    <label className="bg text-danger">
                                                                                        {
                                                                                            errors.stockInDetails[
                                                                                                _index
                                                                                            ].quantityReceived
                                                                                        }
                                                                                    </label>
                                                                                ) : (
                                                                                    ''
                                                                                )}
                                                                            </TableCell>
                                                                        </>
                                                                    );
                                                                } else if (column.dataKey === 'unitPriceReceived') {
                                                                    return (
                                                                        <>
                                                                            <TableCell
                                                                                key={column.dataKey}
                                                                                align={
                                                                                    column.numeric || false
                                                                                        ? 'right'
                                                                                        : 'left'
                                                                                }
                                                                            >
                                                                                <Input
                                                                                    type="number"
                                                                                    defaultValue={row[column.dataKey]}
                                                                                    onChange={(event) =>
                                                                                        handleChangeProductPrice(
                                                                                            event,
                                                                                            _index,
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {errors.stockInDetails &&
                                                                                errors.stockInDetails[_index] ? (
                                                                                    <label className="bg text-danger">
                                                                                        {
                                                                                            errors.stockInDetails[
                                                                                                _index
                                                                                            ].unitPriceReceived
                                                                                        }
                                                                                    </label>
                                                                                ) : (
                                                                                    ''
                                                                                )}
                                                                            </TableCell>
                                                                        </>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            <TableCell
                                                                                key={column.dataKey}
                                                                                align={
                                                                                    column.numeric || false
                                                                                        ? 'right'
                                                                                        : 'left'
                                                                                }
                                                                            >
                                                                                {row[column.dataKey]}
                                                                            </TableCell>
                                                                        </>
                                                                    );
                                                                }
                                                            })}
                                                        </React.Fragment>
                                                    );
                                                }}
                                            />
                                        </Paper>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="card card-static-2 mb-30">
                                <div className="post-form">
                                    <div className="card-title-2 mb-2">
                                        <h4>Thông tin nhân viên</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <Autocomplete
                                            id="select-employee"
                                            // sx={{ width: 200 }}
                                            options={employeeState.dataGetAll.DataSuccess?.listData || []}
                                            autoHighlight
                                            getOptionLabel={(option) => option.fullName}
                                            onChange={handleChangeEmployee}
                                            renderOption={(props, option) => {
                                                const { key, ...optionProps } = props;
                                                return (
                                                    <Box
                                                        key={key}
                                                        component="li"
                                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                        {...optionProps}
                                                    >
                                                        <img
                                                            loading="lazy"
                                                            width="20"
                                                            // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                            src={`${IMG_URL}${option.image}`}
                                                            alt=""
                                                        />
                                                        <div>
                                                            <div>
                                                                <span>Tên: {option.fullName} </span>
                                                            </div>
                                                            <div>
                                                                <span>SĐT: {option.phoneNumber}</span>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Chọn nhân viên"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.employee ? (
                                            <label className="bg text-danger">{errors.employee}</label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-4">
                            <ButtonCustome
                                Title="Nhập hàng"
                                BackgroundColor="#36ef84"
                                HoverColor="#25a35a"
                                onClick={() => {
                                    validate();
                                }}
                                Icon="fa-solid fa-plus"
                                style="mb-5"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ImportGoods;
