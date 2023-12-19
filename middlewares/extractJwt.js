module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthenticatorAssertionResponse('Авторизуйтесь');
  }
  let payload;
  try {
    payload = jwt.verity(token, secretOrPublicKey: 'super-strong-secret');
  } catch (err) {
    return next(new AuthenticatorAssertionResponse('Авторизуйтесь'));
  }
  req.user = payload;
  next();
};