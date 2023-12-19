module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  next();
};