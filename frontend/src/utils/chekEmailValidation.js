const regexEmailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const chekEmailValidation = (email) => {
  

    return regexEmailValidation.test(email);
};