import jwt from 'jsonwebtoken';
require('dotenv').config();
const { user_secret } = process.env;

export const validateToken = (req, res, next) => {
  const header = req.headers.authorization
  if (typeof header !== 'undefined') {
    const bearer = header.split(" ")
    const token = bearer[1]
    const verifiedUser = jwt.verify(token, user_secret)
    if (verifiedUser) {
      req.user = verifiedUser;
      return next();
    }
    res.status(401).json({
      status: res.statusCode,
      error: 'Authentication failed'
    });
  }
  res.status(403).json({
    status: res.statusCode,
    message: 'Sign in to have access'
  })
}
