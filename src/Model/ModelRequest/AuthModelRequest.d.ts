type LoginRequest = {
    userName: string;
    password: string;
    rememberMe: boolean;
};
type SignupRequest = {
    userName: string;
    password: string;
    confilmPassword: string;
    email: string;
    numberPhone: string;
};
export { LoginRequest, SignupRequest };
