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
export { ErrorUserEdit, ErrorCreateUser, ErrorUpdateUser };
