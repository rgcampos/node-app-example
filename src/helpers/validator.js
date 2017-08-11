'use strict';

let errors = [];

exports.isRequired = async (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

exports.hasMinLen = async (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

exports.hasMaxLen = async (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

exports.isFixedLen = async (value, len, message) => {
    if (!value || value.length != len)
        errors.push({ message: message });
}

exports.isEmail = async (value, message) => {
    let reg = new RegExp(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);
    if (!reg.test(value))
        errors.push({ message: message });
}



exports.errors = errors;

exports.clear = async () => {
    errors = [];
}

exports.isValid = async () => {
    return errors.length == 0;
}