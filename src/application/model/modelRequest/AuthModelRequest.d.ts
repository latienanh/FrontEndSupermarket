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
type RefreshToken = {
    accessToken: string;
    refreshToken: string;
};
type RefreshToken = {
    accessToken: string;
    refreshToken: string;
};
type ForgotPassword = {
    email: string;
};
type ResetPassword = {
    email: string;
    token: string;
    newPassword: string;
};
type AccessToken = {
    UserId: string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
    jti: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string[];
    exp: number;
    iss: string;
    aud: string;
};
export { LoginRequest, SignupRequest, RefreshToken, AccessToken, ResetPassword, ForgotPassword };
