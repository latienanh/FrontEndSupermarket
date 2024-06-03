const validateNumberPhone = (number: string) => {
    const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    return regex.test(number);
};
export default validateNumberPhone;
