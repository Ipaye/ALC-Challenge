const Joi = require("joi");

module.exports = {
  idSchema: {
   return Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      birthyear: Joi.number().integer().min(1900).max(2013),
      email: Joi.string().email()
    })
  }

}