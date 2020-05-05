export const updateObject = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updatedObject
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = !!value && isValid;
    }
    if (rules.minLenght) {
        isValid = value.length >= rules.minLenght && isValid;
    }
    if (rules.isEmail) {
        const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        isValid = regEx.test(value) && isValid;
    }
    if (rules.maxLenght) {
        isValid = value.length <= rules.maxLenght && isValid;
    }
    return isValid;
}