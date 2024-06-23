type LoginViewModel = {
    userName: string;
    passWord: string;
};
type ErrorLogin = {
    userName?: string;
    passWord?: string;
};
type SignUpViewModel = {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: File | null;
    phoneNumber: string;
    confilmPassword: string;
};
type ErrorSignUp = {
    userName?: string;
    passWord?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    email?: string;
    phoneNumber?: string;
    confilmPassword?: string;
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
};
export { LoginViewModel, ErrorLogin, SignUpViewModel, ErrorSignUp };
