const validator = require('validator');
const isEmpty = require('is-empty');

let errors = {};


const extremeWays = (data)=>{
    console.log(data);
    data.name = (!isEmpty(data.name)?data.name: "");
    data.email = ((!isEmpty(data.email)?data.email: ""));
    data.password = ((!isEmpty(data.password)?data.password: ""));
    data.password2 = ((!isEmpty(data.password2)?data.password2: ""));

    if(validator.isEmpty(data.name)) errors.name = "Name is a required field! ";
    if(validator.isEmpty(data.email)) errors.email = "Email is a required field!";
    else if(!validator.isEmail(data.email)) errors.email = "Invalid email entered";

    if(validator.isEmpty(data.password) || validator.isEmpty(data.password2)) errors.password = "Passwords cannot be empty";
    if(!validator.isLength(data.password, {min: 6, max: 46})) errors.password = "Password too short";
    if(!validator.equals(data.password, data.password2)) errors.password = "Passwords do not match";

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = extremeWays;