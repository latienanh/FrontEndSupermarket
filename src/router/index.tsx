import { AllLayouts } from '~/common/components/layouts';
import { Login, Logout, SignUp } from '~/pages/auth';
import { AddCategory, AddProduct, CategoryPage, Product, ProductDetail } from '~/pages/entitySupermarket';
import Home from '~/pages/home';

const publicRouter = [
    { path: '/Home', component: Home, layout: AllLayouts.DefaultLayout },
    { path: '/Login', component: Login, layout: null },
    { path: '/Signup', component: SignUp, layout: null },
    { path: '/Logout', component: Logout, layout: null },
    { path: '/Categories', component: CategoryPage, layout: AllLayouts.DefaultLayout },
    { path: '/Add_Category', component: AddCategory, layout: AllLayouts.DefaultLayout },
    { path: '/Products', component: Product, layout: AllLayouts.DefaultLayout },
    { path: '/Add_Product', component: AddProduct, layout: AllLayouts.DefaultLayout },
    { path: '/Product_Detail', component: ProductDetail, layout: AllLayouts.DefaultLayout },
];
const privateRouter: any = [];
export { privateRouter, publicRouter };
