import jwt from 'jsonwebtoken';
require('dotenv').config();
const { user_secret } = process.env;

export const validateToken = (req, res, next) => {
  const header = req.headers.authorization
  if (typeof header !== 'undefined') {
    const bearer = header.split(" ")
    const token = bearer[1]
    try {
      const verifiedUser = jwt.verify(token, user_secret)
      req.user = verifiedUser;
      return next();

    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Invalid token'
      });
    }

  }
  return res.status(401).json({
    status: res.statusCode,
    message: 'Sign in to have access'
  })
}
