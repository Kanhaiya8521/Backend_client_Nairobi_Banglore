import Joi from "joi";

export const userSignupValidation =  (
  data: any
): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    first_name: Joi.string()
      .required()
      .trim()
      // .regex(/^[a-zA-Z]\w{3,31}$/)
      .messages({
        "string.base": "first_name should be string",
        "string.empty": "first_name can't be empty",
        "any.required": "first_name is required",
      }),
    last_name: Joi.string()
      .required()
      .trim()
      // .regex(/^[a-zA-Z]\w{3,31}$/)
      .messages({
        "string.base": "last_name should be string",
        "string.empty": "last_name can't be empty",
        "any.required": "last_name is required",
      }),
    user_name: Joi.string()
      .required()
      .trim()
      // .regex(/^[a-zA-Z]\w{3,31}$/)
      .messages({
        "string.base": "user_name should be string",
        "string.empty": "user_name can't be empty",
        "any.required": "user_name is required",
      }),
    phone: Joi.string()
      .required()
      .trim()
      .pattern(/^[6-9]\d{9,12}$/)
      // .regex(/^[a-zA-Z]\w{3,31}$/)
      .messages({
        "string.base": "phone should be string",
        "string.empty": "phone can't be empty",
        "any.required": "phone is required",
        "string.pattern.base":
          "Phone must be numeric, 10 to 13 digits, and start with 6, 7, 8, or 9",
        "string.pattern":
          "Phone must start with a digit between 6 to 9 and contain only numeric digits",
      }),
    email: Joi.string()
      .required()
      .trim()
      // .regex(/^[a-zA-Z]\w{3,31}$/)
      .messages({
        "string.base": "email should be string",
        "string.empty": "email can't be empty",
        "any.required": "email is required",
      }),
    password: Joi.string()
      .required()
      .trim()
      // .regex(/^[a-zA-Z]\w{3,31}$/)
      .messages({
        "string.base": "password should be string",
        "string.empty": "password can't be empty",
        "any.required": "password is required",
      }),
    confirm_password: Joi.string()
      // .required()
      .trim()
      // .regex(/^[a-zA-Z]\w{3,31}$/)
      .messages({
        "string.base": "confirm_password should be string",
        "string.empty": "confirm_password can't be empty",
        // "any.required": "password is required",
      }),
  });
  return schema.validate(data);
};