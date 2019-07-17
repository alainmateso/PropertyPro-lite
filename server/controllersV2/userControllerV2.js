import jwt from 'jsonwebtoken';

import QueryExecutor from '../database/queryExecutor'
import queries from '../database/queries'

const {
  createUserAccount,
  loginUser
} = queries

const { queryExecutor } = QueryExecutor


require('dotenv').config();

const { user_secret } = process.env;

class UserControllerV2 {
  static async createUser(req, res) {
    const { email, first_name, last_name, password, phoneNumber, address } = req.body;
    const newUser = [email, first_name, last_name, password, phoneNumber, address]
    const token = jwt.sign({ ...newUser }, user_secret, { expiresIn: '24h' });
    const { rows } = await queryExecutor(createUserAccount, newUser)
    return res.status(201).json({
      status: res.statusCode,
      message: 'User account created Successfully',
      token: token,
      data: rows
    });
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;
    const credentials = [email, password]
    const { rows, rowCount } = await queryExecutor(loginUser, credentials)
    console.log(rowCount);
    if (rowCount == 0) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Invalid email or password'
      })
    }
    const token = jwt.sign({ ...rows }, user_secret, { expiresIn: '24h' });
    return res.status(201).json({
      status: res.statusCode,
      message: 'Login sucessful',
      token: token,
      data: rows
    });
  }
}

export default UserControllerV2;
