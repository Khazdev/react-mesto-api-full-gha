const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const config = require('../config');

module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError('Требуется авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  if (!token) {
    throw new NotAuthorizedError('Требуется авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (e) {
    throw new NotAuthorizedError('Неверный токен авторизации');
  }
  req.user = payload;
  return next();
};
