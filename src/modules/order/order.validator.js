const Joi = require("joi");
const { Status } = require("../../config/constants");

OrderCreateDTO = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE)
})

module.exports = {
    OrderCreateDTO
}