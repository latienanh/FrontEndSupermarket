type UserCreateRequest = {
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    avatar: File | null;
    confilmPassword: string;
    roles: string[];
};

type UserUpdateRequest = {
    id: string | undefined;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    avatar: File | null;
    roles: string[];
};
type UserEditRequest = {
    id: string | undefined;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    avatar: File | null;
};

export { UserCreateRequest, UserEditRequest, UserUpdateRequest };
