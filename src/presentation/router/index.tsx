import { AllLayouts } from '~/presentation/components/layouts';
import { Login, Logout, SignUp } from '~/presentation/pages/auth';
import {
    AddCategory,
    AddProduct,
    AddUser,
    CategoryPage,
    Product,
    ProductDetail,
    UpdateUser,
    UserPage,
} from '~/presentation/pages/entitySupermarket';
import Home from '~/presentation/pages/home';
import { UserProfile } from '../pages/userProfile';
import { URL_APP } from './Link';

const publicRouter = [
    { path: URL_APP.Login, component: Login, layout: null },
    { path: URL_APP.Signup, component: SignUp, layout: null },
    { path: URL_APP.Logout, component: Logout, layout: null },
];
const privateRouter = [
    { path: URL_APP.Home, component: Home, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.Categories, component: CategoryPage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddCategory, component: AddCategory, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.Products, component: Product, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddProduct, component: AddProduct, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.ProductDetail, component: ProductDetail, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.UserProfile, component: UserProfile, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.User, component: UserPage, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: URL_APP.AddUser, component: AddUser, layout: AllLayouts.DefaultLayout, role: 'admin' },
    { path: `${URL_APP.UpdateUser}/:id`, component: UpdateUser, layout: AllLayouts.DefaultLayout, role: 'admin' },
];
export { privateRouter, publicRouter };
