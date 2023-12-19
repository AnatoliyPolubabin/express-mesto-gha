module.exports = (req, res, next) => {
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  next();
};