const jwt = require('jsonwebtoken');
const AuthError = require('../errs/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (reg, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError('Авторизируетесь');
  }
  Let payload;
  try {
    payload = jwt.verify(token,
  } catch (err) {
    return next(new AuthError('Авторизируетесь'));
  }
  req.user = payload;
  next;
  ｝;
