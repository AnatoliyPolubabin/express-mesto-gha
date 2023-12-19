module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  next();
};