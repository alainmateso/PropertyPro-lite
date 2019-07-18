import jwt from 'jsonwebtoken';
import dotENV from 'dotenv'
import QueryExecutor from '../database/queryExecutor'
import queries from '../database/queries'

const {
  createUserAccount,
  loginUser
} = queries

const { queryExecutor } = QueryExecutor

dotENV.config();

const { user_secret } = process.env;

class UserController {
  static async createUser(req, res) {
    const { email, first_name, last_name, password, phoneNumber, address } = req.body;
    const newUser = [email, first_name, last_name, password, phoneNumber, address]
    const { rows } = await queryExecutor(createUserAccount, newUser)
    const token = jwt.sign({ rows }, user_secret, { expiresIn: '24h' });
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
    const token = jwt.sign({ rows }, user_secret, { expiresIn: '24h' });
    if (rowCount == 0) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Invalid email or password'
      })
    }
    return res.status(200).json({
      status: res.statusCode,
      message: 'Login sucessful',
      token: token,
      data: rows
    });
  }

}

export default UserController;
