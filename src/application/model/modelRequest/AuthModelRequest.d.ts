type LoginRequest = {
    userName: string;
    password: string;
};
type SignupRequest = {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: File | null;
    phoneNumber: string;
    confilmPassword: string;
};
type RefershToken = {
    accessToken: string;
    refershToken: string;
};
export { LoginRequest, SignupRequest };
