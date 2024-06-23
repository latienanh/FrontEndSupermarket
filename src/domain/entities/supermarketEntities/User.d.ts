import { Role } from './Role';

export default interface User {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    fullName: string;
    image: string;
    roles: Role[];
}
