import { AllLayouts } from '~/presentation/components/layouts';
import { ForgotPasswordPage, Login, Logout, SignUp } from '~/presentation/pages/auth';
import {
    AddAttribute,
    AddCategory,
    AddCustomer,
    AddEmployee,
    AddMemberShipType,
    AddProduct,
    AddSupplier,
    AddUser,
    AttributePage,
    CategoryPage,
    CustomerPage,
    EmployeePage,
    MemberShipTypePage,
    Product,
    ProductDetail,
    SupplierPage,
    UpdateAttribute,
    UpdateCategory,
    UpdateCustomer,
    UpdateEmployee,
    UpdateMemberShipType,
    UpdateProduct,
    UpdateUser,
    UserPage,
} from '~/presentation/pages/entitySupermarket';
import Home from '~/presentation/pages/home';
import { UserProfile } from '../pages/userProfile';
import { URL_APP } from './Link';
import UpdateSupplier from '../pages/entitySupermarket/supplier/UpdateSupplier';
import { ImportGoods, SalePage } from '../pages/sale';

const publicRouter = [
    { path: URL_APP.NONE, component: Login, layout: null },
    { path: URL_APP.Login, component: Login, layout: null },
    { path: URL_APP.Signup, component: SignUp, layout: null },
    { path: URL_APP.ForgotPassword, component: ForgotPasswordPage, layout: null },
];
const privateRouter = [
    { path: URL_APP.Logout, component: Logout, layout: null },
    { path: URL_APP.Home, component: Home, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.Categories, component: CategoryPage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: `${URL_APP.AddCategory}/:id`, component: AddCategory, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddCategory, component: AddCategory, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.Products, component: Product, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddProduct, component: AddProduct, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.ProductDetail, component: ProductDetail, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: `${URL_APP.UpdateProduct}/:id`, component: UpdateProduct, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.UserProfile, component: UserProfile, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.User, component: UserPage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddUser, component: AddUser, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: `${URL_APP.UpdateUser}/:id`, component: UpdateUser, layout: AllLayouts.DefaultLayout, role: 'admin' },
    {
        path: `${URL_APP.UpdateCategory}/:id`,
        component: UpdateCategory,
        layout: AllLayouts.DefaultLayout,
        role: 'admin',
    },
    { path: URL_APP.MemberShipType, component: MemberShipTypePage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddMemberShipType, component: AddMemberShipType, layout: AllLayouts.DefaultLayout, role: 'admin' },
    {
        path: `${URL_APP.UpdateMemberShipType}/:id`,
        component: UpdateMemberShipType,
        layout: AllLayouts.DefaultLayout,
        role: 'admin',
    },
    { path: URL_APP.Customer, component: CustomerPage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddCustomer, component: AddCustomer, layout: AllLayouts.DefaultLayout, role: 'admin' },
    {
        path: `${URL_APP.UpdateCustomer}/:id`,
        component: UpdateCustomer,
        layout: AllLayouts.DefaultLayout,
        role: 'admin',
    },
    { path: URL_APP.Attribute, component: AttributePage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddAttribute, component: AddAttribute, layout: AllLayouts.DefaultLayout, role: 'admin' },
    {
        path: `${URL_APP.UpdateAttribute}/:id`,
        component: UpdateAttribute,
        layout: AllLayouts.DefaultLayout,
        role: 'admin',
    },
    { path: URL_APP.Supplier, component: SupplierPage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddSupplier, component: AddSupplier, layout: AllLayouts.DefaultLayout, role: 'admin' },
    {
        path: `${URL_APP.UpdateSupplier}/:id`,
        component: UpdateSupplier,
        layout: AllLayouts.DefaultLayout,
        role: 'admin',
    },
    { path: URL_APP.Employee, component: EmployeePage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddEmployee, component: AddEmployee, layout: AllLayouts.DefaultLayout, role: 'admin' },
    {
        path: `${URL_APP.UpdateEmployee}/:id`,
        component: UpdateEmployee,
        layout: AllLayouts.DefaultLayout,
        role: 'admin',
    },
    { path: URL_APP.Sale, component: SalePage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.ImportGoods, component: ImportGoods, layout: AllLayouts.DefaultLayout, role: 'admin' },
];
export { privateRouter, publicRouter };
