type EmployeeRequest = {
    id?: string | undefined;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    email: string;
    image: File | null;
};

export { EmployeeRequest };
