import jwt from 'jsonwebtoken';
import dotENV from 'dotenv'
import omit from 'lodash.omit'
import QueryExecutor from '../database/queryExecutor'
import queries from '../database/queries'

const {
  createUserAccount,
  loginUser,
  selectUserByEmail,
  updateUserCredentials
} = queries

const { queryExecutor } = QueryExecutor

dotENV.config();

const { user_secret } = process.env;

class UserController {
  static async createUser(req, res) {
    const { email, first_name, last_name, password, phoneNumber, address } = req.body;
    const { rowCount } = await queryExecutor(selectUserByEmail, [email])
    if (rowCount == 0) {
      const newUser = [email, first_name, last_name, password, phoneNumber, address]
      const { rows } = await queryExecutor(createUserAccount, newUser)
      const [row] = rows;
      const userEmail = row.email;
      const token = jwt.sign({ userEmail }, user_secret, { expiresIn: '24h' });
      const [results] = rows;
      const user = omit(results, 'password');
      user.token = token
      return res.status(201).json({
        status: res.statusCode,
        message: 'User account created Successfully',
        data: user
      });
    }
    return res.status(409).json({
      status: res.statusCode,
      error: 'Email already exists'
    });

  }

  static async userLogin(req, res) {
    const { email, password } = req.body;
    const credentials = [email, password]
    const { rows, rowCount } = await queryExecutor(loginUser, credentials)
    const [row] = rows;
    const userEmail = row.email;
    const token = jwt.sign({ userEmail }, user_secret, { expiresIn: '24h' });
    if (rowCount == 0) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Invalid email or password'
      })
    }
    const [results] = rows;
    const user = omit(results, 'password');
    user.token = token
    return res.status(200).json({
      status: res.statusCode,
      message: 'Login sucessful',
      data: user
    });
  }

  static async changePassword(req, res) {
    const email = req.params.email
    const { oldPassword, newPassword } = req.body;
    const newCredentials = [newPassword, email]
    let { rows, rowCount } = await queryExecutor(selectUserByEmail, [email])
    if (rowCount == 0) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Invalid email'
      })
    }
    const [results] = rows
    if (oldPassword !== results.password) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Old password is incorrect'
      })
    } else {
      await queryExecutor(updateUserCredentials, newCredentials)
      return res.status(200).json({
        status: res.statusCode,
        message: 'Password Changed successfully'
      });
    }
  }

}

export default UserController;
