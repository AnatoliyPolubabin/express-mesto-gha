const jwt = require('jsonwebtoken');
const NotFoundError = require('../errs/NotFoundError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotFoundError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new NotFoundError('Необходима авторизация:'));
  }

  req.user = payload;
  next();
};