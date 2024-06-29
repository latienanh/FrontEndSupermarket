import MemberShipType from './MemberShipType';

export default interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    address: string;
    phoneNumber: string;
    email: string;
    membershipType: MemberShipType;
}
