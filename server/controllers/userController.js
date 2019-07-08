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
    const newUser = { token, id: users.length + 1, email, first_name, last_name, password, phoneNumber, address, is_admin: false }
    newUser.token = token;
    users.push(newUser);
    return res.status(201).json({
      status: res.statusCode,
      data: newUser
    });
  }

  static userSignIn(req, res) {
    const { email, password } = req.body;
    const logedUser = users.find(member => member.email == email && member.password == password);
    if (!logedUser) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'User not found! Double check your email and password'
      });
    }
    res.status(200).json({
      status: res.statusCode,
      data: logedUser
    });
  }
}

export default UserController;
