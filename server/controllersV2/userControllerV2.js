import jwt from 'jsonwebtoken';

import QueryExecutor from '../database/queryExecutor'
import queries from '../database/queries'

const {
  createUserAccount
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
}

export default UserControllerV2;
