import Joi from '@hapi/joi';

function validator(req, res, schema, next) {
  const { error: validationErrors } = Joi.validate(req.body, schema, {
    abortEarly: false
  });
  if (validationErrors) {
    const error = [];
    const { details: errors } = validationErrors;
    errors.forEach(element => {
      error.push(element.message.split('"').join(''));
    });
    return res.status(400).json({
      status: res.statusCode,
      error: error
    });
  }
  next();
}
class ValidationMiddleware {
  static createPropertyValidation(req, res, next) {
    const schema = Joi.object().keys({
      owner: Joi.number().integer().required(),
      price: Joi.number().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      type: Joi.string().required()
    });
    validator(req, res, schema, next);
  }

  static updatePropertyValidation(req, res, next) {
    const schema = Joi.object().keys({
      owner: Joi.number().integer().min(1),
      price: Joi.number().min(3),
      state: Joi.string().min(3),
      city: Joi.string().min(3),
      address: Joi.string().min(3),
      type: Joi.string().min(3)
    });
    validator(req, res, schema, next);
  }
}
export default ValidationMiddleware;
