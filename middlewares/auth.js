const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => res.status(403).send({ message: 'Необходима авторизация' });

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;
  const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  return next();
};
