import { Autocomplete, Box, Input, Stack, TableCell, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
    ErrorInvoiceDetailView,
    ErrorInvoiceView,
    ErrorStockInDetailView,
    ErrorStockInView,
} from '~/application/model/modelErrorRequest/ErrorEntity';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { EmployeeService } from '~/application/redux/slide/EmployeeSlide';
import { ProductService } from '~/application/redux/slide/ProductSlide';
import { SupplierService } from '~/application/redux/slide/SupplierSlide';
import Employee from '~/domain/entities/supermarketEntities/Employee';
import { Product } from '~/domain/entities/supermarketEntities/Product';
import Supplier from '~/domain/entities/supermarketEntities/Supplier';
import { ButtonCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { error } from 'console';
import { InvoiceDetailView, InvoiceView } from '~/application/model/modelView/SaleModelView';
import { CustomerService } from '~/application/redux/slide/CustomerSlide';
import { SaleService } from '~/application/redux/slide/SaleSlide';
import Customer from '~/domain/entities/supermarketEntities/Customer';

interface ColumnStockInDetail {
    dataKey: keyof InvoiceDetailView;
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
        label: 'Số lượng bán',
        dataKey: 'quantity',
        numeric: true,
    },
];
const CustomTableHead = React.forwardRef<HTMLTableSectionElement, any>((props, ref) => {
    return <thead ref={ref} {...props} />;
});
const VirtuosoTableComponents: TableComponents<InvoiceDetailView> = {
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

function SalePage() {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const saleState = useSelector((state: RootState) => state.sale);
    const productState = useSelector((state: RootState) => state.product);
    const customerState = useSelector((state: RootState) => state.customer);
    const employeeState = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch<AppDispatch>();
    const [invoiceAdd, setInvoiceAdd] = useState<InvoiceView>({
        customer: null,
        employee: null,
        paymentStatus: 0,
        paymentMethod: '',
        invoiceDetails: [],
    });
    const [errors, setErrors] = useState<ErrorInvoiceView>({});

    useEffect(() => {
        dispatch(CustomerService.fetchGetAll());
        dispatch(ProductService.fetchGetAll());
        dispatch(EmployeeService.fetchGetAll());
    }, []);
    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };
    const handleInvoiceDetailError = (errorMessage: string | null, input: string, index: number) => {
        setErrors((prevState) => {
            const errorInvoiceDetail = prevState.invoiceDetails?.map((invoiceDetail, i) => {
                // console.log(i);
                if (i === index) {
                    return {
                        ...invoiceDetail,
                        [input]: errorMessage,
                    };
                }
                return invoiceDetail;
            });

            return {
                ...prevState,
                invoiceDetails: errorInvoiceDetail || [],
            };
        });
    };
    const validate = () => {
        let isValid = true;

        if (!invoiceAdd?.employee) {
            handleError('Chưa chọn nhân viên !', 'employee');
            isValid = false;
        }
        if (invoiceAdd.invoiceDetails.length <= 0) {
            handleError('Chưa chọn sản phẩm', 'invoiceDetail');
            isValid = false;
        }
        if (invoiceAdd.invoiceDetails && invoiceAdd.invoiceDetails.length > 0) {
            invoiceAdd.invoiceDetails.forEach((item, index) => {
                if (!item?.quantity) {
                    handleInvoiceDetailError('Vui lòng nhập số lượng !', 'quantity', index);
                    isValid = false;
                } else if (item.quantity > item.quantityProduct) {
                    handleInvoiceDetailError(`Sản phẩm trong kho chỉ có ${item.quantityProduct}!`, 'quantity', index);
                    isValid = false;
                }
            });
        }
        if (isValid) {
            // console.log(invoiceAdd);
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            const payload: InvoiceRequest = {
                customerId: invoiceAdd.customer ? invoiceAdd.customer.id : null,
                employeeId: invoiceAdd.employee?.id || '',
                paymentMethod: invoiceAdd.paymentMethod,
                paymentStatus: invoiceAdd.paymentStatus,
                invoiceDetails: invoiceAdd.invoiceDetails.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                })),
            };
            dispatch(SaleService.fetchSale(payload));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!saleState.isLoading) {
            if (!saleState.isError && saleState.dataSale) {
                if (hasEditDataChanged) {
                    toast.success(saleState.dataSale.message);
                    navigate(URL_APP.Products);
                }
            } else if (saleState.isError && saleState.dataSale) {
                toast.error(saleState.dataSale.message);
            }
        }
    }, [saleState.dataSale]);

    const handleChangeCustomer = (event: any, newValue: Customer | null) => {
        handleError('', 'customer');
        if (newValue) {
            setInvoiceAdd((prev) => ({
                ...prev,
                customer: newValue,
            }));
        } else {
            setInvoiceAdd((prev) => ({
                ...prev,
                customer: null,
            }));
        }
    };
    const handleChangeEmployee = (event: any, newValue: Employee | null) => {
        handleError('', 'employee');
        if (newValue) {
            setInvoiceAdd((prev) => ({
                ...prev,
                employee: newValue,
            }));
        } else {
            setInvoiceAdd((prev) => ({
                ...prev,
                employee: null,
            }));
        }
    };
    const handleChangeProductQuantity = (event: any, index: number) => {
        handleInvoiceDetailError('', 'quantity', index);
        // quantityReceived?: string;
        // unitPriceReceived?: string;
        setInvoiceAdd((prevState) => {
            const updatedInvoiceDetails = prevState.invoiceDetails?.map((invoiceDetail, i) => {
                if (i === index) {
                    return {
                        ...invoiceDetail,
                        quantity: parseFloat(event.target.value),
                    };
                }
                return invoiceDetail;
            });

            return {
                ...prevState,
                invoiceDetails: updatedInvoiceDetails || [],
            };
        });
    };
    const handleChangeProduct = (event: any, newValue: Product[] | null) => {
        handleError('', 'invoiceDetail');
        if (newValue) {
            setInvoiceAdd((prevStockIn) => {
                let newInvoiceDetails: InvoiceDetailView[] = [];
                newValue.forEach((value) => {
                    newInvoiceDetails.push({
                        productId: value.id,
                        name: value.name,
                        quantityProduct: value.quantity,
                        price: value.price,
                        quantity: 0,
                        unitPrice: value.price,
                    });
                });
                return {
                    ...prevStockIn,
                    invoiceDetails: newInvoiceDetails,
                };
            });
            setErrors((prevInvoiceDetail) => {
                let newErrorInvoiceDetail: ErrorInvoiceDetailView[] = [];
                newValue.forEach(() => {
                    newErrorInvoiceDetail.push({
                        quantity: '',
                        unitPrice: '',
                    });
                });
                return {
                    ...prevInvoiceDetail,
                    invoiceDetails: newErrorInvoiceDetail,
                };
            });
        }
    };

    return (
        <>
            {' '}
            <main>
                <div className="container-fluid">
                    <h2 className="mt-30 page-title">Bán hàng</h2>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item">
                            <a href="Sản phẩm.html">Bán hàng</a>
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
                                            id="select-customer"
                                            // sx={{ width: 200 }}
                                            options={customerState.dataGetAll.DataSuccess?.listData || []}
                                            autoHighlight
                                            getOptionLabel={(option) => option.fullName}
                                            onChange={handleChangeCustomer}
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
                                                                <span>Tên Khách hàng: {option.fullName} </span>
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
                                                    label="Chọn nhà khách hàng"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.customer ? (
                                            <label className="bg text-danger">{errors.customer}</label>
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
                                                                            option.quantity < 10 ? `text-danger` : ''
                                                                        }
                                                                    >
                                                                        Số lượng: {option.quantity}
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
                                            {errors.invoiceDetail ? (
                                                <label className="bg text-danger">{errors.invoiceDetail}</label>
                                            ) : (
                                                ''
                                            )}
                                        </Stack>
                                        <Paper style={{ height: 400, width: '100%' }}>
                                            <TableVirtuoso
                                                data={invoiceAdd.invoiceDetails}
                                                components={VirtuosoTableComponents}
                                                fixedHeaderContent={fixedHeaderContent}
                                                itemContent={(_index: number, row: InvoiceDetailView) => {
                                                    return (
                                                        <React.Fragment>
                                                            {ColumnStockInDetails.map((column) => {
                                                                if (column.dataKey === 'quantity') {
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
                                                                                {errors.invoiceDetails &&
                                                                                errors.invoiceDetails[_index] ? (
                                                                                    <label className="bg text-danger">
                                                                                        {
                                                                                            errors.invoiceDetails[
                                                                                                _index
                                                                                            ].quantity
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
                                Title="Bán hàng"
                                BackgroundColor="#36ef84"
                                HoverColor="#25a35a"
                                onClick={() => {
                                    validate();
                                    // console.log(invoiceAdd);
                                    console.log(errors);
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

export default SalePage;
