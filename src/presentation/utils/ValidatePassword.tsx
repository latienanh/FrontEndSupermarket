const validateLowercase = (password: string) => {
    const regex = /[a-z]/;

    return regex.test(password);
};
const validateUppercase = (password: string) => {
    const regex = /[A-Z]/;

    return regex.test(password);
};
const validateNumber = (password: string) => {
    const regex = /[0-9]/;

    return regex.test(password);
};
const validateSpecialCharacter = (password: string) => {
    const regex = /[\W_]/;

    return regex.test(password);
};
export { validateLowercase, validateUppercase, validateSpecialCharacter, validateNumber };
