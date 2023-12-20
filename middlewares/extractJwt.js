module.exports = (req, res, next) => {
  if (jwt) {
    req.headers.authorization = `Bearer ${jwt}`;
  }
  next();
};