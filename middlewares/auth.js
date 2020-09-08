const jwt = require('jsonwebtoken');
const { safekey } = require('../safeKey');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Пользователь не авторизован' });
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, safekey);
  } catch (err) {
    return res.status(401).send({ message: 'Пользователь не авторизован' });
  }
  req.user = payload;

  next();
};
