const { services: jwtServices } = require('../services/jwt.service');

const authMiddleware = (req, res, next) => {
  const header = req.headers['authorization'] || '';
  const [, token] = header.split(' ');

  if (!header || !token) {
    res.sendStatus(401);

    return;
  }

  const userData = jwtServices.verify(token);

  if (!userData) {
    res.sendStatus(401);

    return;
  }

  next();
};

module.exports = {
  authMiddleware,
};
