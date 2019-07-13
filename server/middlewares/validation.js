import Joi from '@hapi/joi';

const validator = (req, res, schema, next) => {
  const { error: validationErrors } = Joi.validate({ ...req.body, ...req.params }, schema, {
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
  // Create new Property Validation
  static createPropertyValidation(req, res, next) {
    const schema = Joi.object().keys({
      price: Joi.number().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      type: Joi.string().required()
    });
    validator(req, res, schema, next);
  }

  static updatePropertyValidation(req, res, next) {
    // Update Property details validation
    const schema = Joi.object().keys({
      price: Joi.number().min(3),
      state: Joi.string().min(3),
      city: Joi.string().min(3),
      address: Joi.string().min(3),
      type: Joi.string().min(3)
    });
    validator(req, res, schema, next);
  }

  // User Sign Up validation
  static userSignUpValidation(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      first_name: Joi.string().min(3).required(),
      last_name: Joi.string().min(3).required(),
      password: Joi.string().alphanum().min(6).required(),
      phoneNumber: Joi.number().required(),
      address: Joi.string().required()
    });
    validator(req, res, schema, next);
  }
  static idValidation(req, res, next) {
    const schema = Joi.object().keys({
      id: Joi.number().required()
    });
    validator(req, res, schema, next);
  }
}

export default ValidationMiddleware;
