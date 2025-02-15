const Joi = require("joi");

const RegisterUserDTO = Joi.object({
  fullName: Joi.string().min(2).max(50).required().messages({
    "string.base": "Full name must be a string",
    "string.empty": "Full name cannot be empty",
    "string.min": "Full name must be atleast 2 characters long",
    "string.max": "Full name must be atmost 50 characters long",
    "any.required": "Full name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,25}$/).required().messages({
      "string.pattern.base":"Password must be atleast 8 characters long and contain atleast one uppercase letter, one lowercase letter, one digit and one special character.",
    }),
  confirmPassword: Joi.string().equal(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
  }),
  role: Joi.string().regex(/^(admin|customer|seller)$/).default("customer"),
  address: Joi.string(),
  phone: Joi.string().regex(/^(?:\+977\s?)?(98|97|90|96)\d{8}$/),
  gender: Joi.string().regex(/^(male|female|other)$/).required(),
  // bio: Joi.string().allow(null, "").optional().default(""),
});
// .unknown(true); // allow other fields apart from the specified fields

const LoginDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const ForgetPasswordDTO = Joi.object({
  email: Joi.string().email().required(),
});

const ResetPasswordDTO = Joi.object({
  token: Joi.string().min(100).max(100).required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,25}$/).required().messages({
      "string.pattern.base":"Password must be atleast 8 characters long and contain atleast one uppercase letter, one lowercase letter, one digit and one special character.",
    }),
  confirmPassword: Joi.string().equal(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
  }),
});

const ChangePasswordDTO = Joi.object({
    oldPassword: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,25}$/).required().messages({
        "string.pattern.base":"Password must be atleast 8 characters long and contain atleast one uppercase letter, one lowercase letter, one digit and one special character.",
      }),
    confirmPassword: Joi.string().equal(Joi.ref("password")).required().messages({
      "any.only": "Confirm password must match password",
    }),
})

module.exports = {
  RegisterUserDTO,
  LoginDTO,
  ForgetPasswordDTO,
  ResetPasswordDTO,
  ChangePasswordDTO
};
