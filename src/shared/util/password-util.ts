/* eslint-disable */
export const validatePassword = (password, minLength, maxLength) => {
  const regex = /[!@#$%^&*\(\),\.\?":{}|<>`~\-=+_\\\/\[\]]/g;

  return {
    lowerLetters: /[a-z]+/.test(password),
    upperLetters: /[A-Z]+/.test(password),
    numbers: /[0-9]+/.test(password),
    symbols: regex.test(password),
    passwordLength: password.length >= minLength && password.length <= maxLength,
  };
};
/* eslint-enable */
