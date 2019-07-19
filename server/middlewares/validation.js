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
      price: Joi.number().min(1).max(999999999999).required(),
      state: Joi.string().trim().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'State format').min(3).required(),
      city: Joi.string().trim().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'City format').min(3).required(),
      address: Joi.string().trim().min(2).max(50).required(),
      type: Joi.string().trim().regex(/^(1 bedroom|2 bedrooms|3 bedrooms|4 bedrooms|5 bedrooms|Villa|Apartment|Others)$/, 'property type').required()
    });
    validator(req, res, schema, next);
  }

  static updatePropertyValidation(req, res, next) {
    // Update Property details validation
    const schema = Joi.object().keys({
      id: Joi.number().min(1).max(999999999999),
      price: Joi.number().min(1).max(999999999999).required(),
      state: Joi.string().trim().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'State format').min(3).required(),
      city: Joi.string().trim().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'City format').min(3).required(),
      address: Joi.string().trim().min(2).max(50).required(),
      type: Joi.string().trim().regex(/^(1 bedroom|2 bedrooms|3 bedrooms|4 bedrooms|5 bedrooms|Villa|Apartment|Others)$/, 'property type').required()
    });
    validator(req, res, schema, next);
  }

  // User Sign Up validation
  static userSignUpValidation(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      first_name: Joi.string().trim().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'Name format').min(3).required(),
      last_name: Joi.string().trim().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'Name format').min(3).required(),
      password: Joi.string().min(6).max(50).required(),
      phoneNumber: Joi.number().required(),
      address: Joi.string().trim().min(2).max(50).required(),
    });
    validator(req, res, schema, next);
  }
  static idValidation(req, res, next) {
    const schema = Joi.object().keys({
      id: Joi.number().min(1).max(999999999999)
    });
    validator(req, res, schema, next);
  }
}

export default ValidationMiddleware;
