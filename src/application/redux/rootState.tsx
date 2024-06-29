import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slide/AuthSlide';
import CategoryReducer from './slide/CategorySlide';
import UserReducer from './slide/UserSlide';
import RoleReducer from './slide/RoleSlide';
import MemberShipTypeReducer from './slide/MemberShipTypeSlide';
import CustomerReducer from './slide/CustomerSlide';
import AttributeReducer from './slide/AttributeSlide';
import EmployeeReducer from './slide/EmployeeSlide';
import SupplierReducer from './slide/SupplierSlide';
import ProductReducer from './slide/ProductSlide';
import SaleSlide from './slide/SaleSlide';
import ImportGoodsSlide from './slide/ImportGoodsSlide';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    category: CategoryReducer,
    auth: AuthReducer,
    user: UserReducer,
    role: RoleReducer,
    memberShipType: MemberShipTypeReducer,
    customer: CustomerReducer,
    attribute: AttributeReducer,
    supplier: SupplierReducer,
    employee: EmployeeReducer,
    product: ProductReducer,
    sale: SaleSlide,
    importGoods: ImportGoodsSlide,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export let persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
