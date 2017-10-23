const Joi = require("joi");

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      console.log('req-param', req.params);
      const result = Joi.validate({
        param: req['params'][name]
      }, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {}
        }
        if (!req.value['params'])
          req.value['params'] = {};

        req.value['params'][name] = result.value.param;
        next();
      }
    }
  },
  ValidateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        if (!req.value) req.value = {};

        if (!req.value['body']) req.value['body'] = {}
        req.value['body'] = result.value;
        next()
      }
    }
  },

  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    studentSchema: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      address: Joi.string(),
      course: Joi.string(),
      dob: Joi.string().required(),
      gender: Joi.string(),
      phoneNumber: Joi.number(),
      level: Joi.number(),
      profileImage : Joi.string()
    }),
    updateSchema : Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      address: Joi.string(),
      course: Joi.string(),
      dob: Joi.string().required(),
      gender: Joi.string(),
      phoneNumber: Joi.number(),
      level: Joi.number(),
      profileImage : Joi.string()
    })
  }

}