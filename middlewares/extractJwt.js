const jwt = require('jsonwebtoken');
const NotFoundError = require('../errs/NotFoundError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(new NotFoundError({ message: 'Необходима авторизация' }));
  }
  req.user = payload;

  next();
};

module.exports = auth;