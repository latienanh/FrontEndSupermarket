type ErrorUserEdit = {
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    image?: string;
};
type ErrorCreateUser = {
    userName?: string;
    passWord?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    email?: string;
    phoneNumber?: string;
    confilmPassword?: string;
    roles?: string;
};
type ErrorUpdateUser = {
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    image?: string;
    roles?: string;
};
type ErrorCustomer = {
    firstName?: string;
    lastName?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    membershipTypeId?: string;
};
type ErrorCategory = {
    name?: string;
    describe?: string;
};
type ErrorMemberShipType = {
    name?: string;
};
type ErrorAttribute = {
    name?: string;
};
type ErrorSupplier = {
    name?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
};
type ErrorEmployee = {
    firstName?: string;
    lastName?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    image?: string;
};
type ErrorProductUpdate = {
    barCode?: string;
    name?: string;
    slug?: string;
    price?: string;
    image?: string;
    describe?: string;
    categoriesId?: string;
};
type ErrorProductCreate = {
    barCode?: string;
    name?: string;
    slug?: string;
    price?: string;
    image?: string;
    describe?: string;
    categoriesId?: string;
    variants?: ErrorVariantCreate[];
};
type ErrorVariantCreate = {
    barCode?: string;
    name?: string;
    slug?: string;
    price?: string;
    image?: string;
    describe?: string;
    categoriesId?: string;
};
export {
    ErrorProductUpdate,
    ErrorUserEdit,
    ErrorCreateUser,
    ErrorUpdateUser,
    ErrorCategory,
    ErrorMemberShipType,
    ErrorCustomer,
    ErrorAttribute,
    ErrorSupplier,
    ErrorEmployee,
    ErrorProductCreate,
    ErrorVariantCreate,
};
