import joi from "joi";
// for local user the user should have a password
const validatePassword = (body) => {
    // Local users must provide a password
    if (body.provider == "local" && !body.password)
        return false;
    return true;
};
export const validateCreateUser = (body) => {
    const taskObject = joi.object({
        email: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().optional(),
        provider: joi.string().valid("local", "google", "facebook").required(),
        providerId: joi.string().optional(),
    });
    const { error } = taskObject.validate(body);
    // Consolidate validation for password
    return error || !validatePassword(body) ? false : true;
};
export const validateUpdateUser = (body) => {
    const taskObject = joi.object({
        id: joi.string().optional(),
        email: joi.string().optional(),
        name: joi.string().optional(),
        password: joi.string().optional(),
        provider: joi.string().valid("local", "google", "facebook").optional(),
        providerId: joi.string().optional(),
    });
    const { error } = taskObject.validate(body);
    return error ? false : true;
};
