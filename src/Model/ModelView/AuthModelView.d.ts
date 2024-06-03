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
    email: string;
    numberPhone: string;
    confilmPassword: string;
};
type ErrorSignUp = {
    userName?: string;
    passWord?: string;
    email?: string;
    numberPhone?: string;
    confilmPassword?: string;
};
export { LoginViewModel, ErrorLogin, SignUpViewModel, ErrorSignUp };
