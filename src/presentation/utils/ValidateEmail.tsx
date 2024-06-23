const validateEmail = (email: string) => {
    const regex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

    return regex.test(email);
};
export default validateEmail;
