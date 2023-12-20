const jwt = require('jsonwebtoken'); // Убедитесь, что вы импортируете библиотеку jwt

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    // Если токен отсутствует, бросаем ошибку авторизации
    return next(new AuthError('Необходима авторизация'));
  }
  let payload;
  try {
    // Верификация токена
    payload = jwt.verify(token, 'd285e3dceed844f902650f40'); // Замените 'ваш_секретный_ключ' на ваш секретный ключ
  } catch (err) {
    // Если токен не валиден, бросаем ошибку авторизации
    return next(new AuthError('Необходима авторизация'));
  }
  // Если верификация прошла успешно, добавляем payload в объект запроса
  req.user = payload;
  next();
};