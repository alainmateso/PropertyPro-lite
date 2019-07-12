import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';
import omit from 'lodash.omit';

import users from '../data/users';

require('dotenv').config();

const { user_secret } = process.env;

class UserController {
  static userSignUp(req, res) {
    const { email, first_name, last_name, password, phoneNumber, address } = req.body;
    const newUser = { token, id: users.length + 1, email, first_name, last_name, password, phoneNumber, address, is_admin: false }
    const token = jwt.sign({ ...newUser }, user_secret, { expiresIn: '24h' });
    newUser.token = token;
    users.push(newUser);
    const result = omit(newUser, 'password');
    return res.status(201).json({
      status: res.statusCode,
      message: 'User account created Successfully',
      data: result
    });
  }

  static userSignIn(req, res) {
    const { email, password } = req.body;
    const logedUser = users.find(member => member.email == email && member.password == password);
    const token = jwt.sign({ ...logedUser }, user_secret, { expiresIn: '24h' });
    if (!logedUser) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Invalid email or password'
      });
    }
    logedUser.token = token;
    const user = omit(logedUser, 'password')
    res.status(200).json({
      status: res.statusCode,
      message: 'Login successful',
      token: user
    });
  }
}

export default UserController;
