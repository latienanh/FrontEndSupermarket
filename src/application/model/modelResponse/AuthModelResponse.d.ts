import User from '~/domain/entities/supermarketEntities/User';
import { ResponseBase } from './ModelResponeseBase';

export interface DataLogin {
    accessToken: string;
    expirationAT: string;
    refreshToken: string;
    expirationRT: string;
    user: User;
}

export interface LoginResponseSuccess extends ResponseBase {
    data: Data;
}
export interface DataSignUp {
    accessToken: string;
    refreshToken: string;
}
export interface ForgotPasswordResponseSuccess extends ResponseBase {
    data: boolean;
}
export interface ResetPasswordResponseSuccess extends ResponseBase {}
export interface SignUpResponseSuccess extends ResponseBase {}
export interface LoginResponseFailure extends ResponseBase {}
export interface SignUpResponseFailure extends ResponseBase {}
export interface LogOutResponseSuccess extends ResponseBase {}
export interface LogOutResponseFailure extends ResponseBase {}
export {
    ForgotPasswordResponseSuccess,
    ResetPasswordResponseSuccess,
    LoginResponseFailure,
    LoginResponseSuccess,
    SignUpResponseSuccess,
    SignUpResponseFailure,
    LogOutResponseSuccess,
    LogOutResponseFailure,
};
