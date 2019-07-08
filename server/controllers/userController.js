import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import users from '../data/users';

require('dotenv').config();

const { user_secret } = process.env;

class UserController {
  static userSignUp(req, res) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      first_name: Joi.string().min(3).required(),
      last_name: Joi.string().min(3).required(),
      password: Joi.string().alphanum().min(6).required(),
      phoneNumber: Joi.number().required(),
      address: Joi.string().required()
    });
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
    const { email, first_name, last_name, password, phoneNumber, address } = req.body;
    const token = jwt.sign({ email: email }, user_secret);
    const newUser = { token, id: users.length + 1, first_name, last_name, password, phoneNumber, address, is_admin: false }
    newUser.token = token;
    users.push(newUser);
    return res.status(201).json({
      status: res.statusCode,
      data: newUser
    });
  }
}

export default UserController;
