const { services: userServices } = require('../models/users.model');
const { services: emailServices } = require('../services/email.service');
const { services: tokenServices } = require('../services/token.service');
const { v4: uuidv4 } = require('uuid');
const { services: jwtServices } = require('../services/jwt.service');
const { ApiError } = require('../exceptions/api.error');
const bcrypt = require('bcrypt');

const validateEmail = (value) => {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
};

const validatePassword = (value) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

const generateTokens = async (res, user) => {
  const normalizedUser = userServices.normalize(user);

  const accessToken = jwtServices.sign(normalizedUser);
  const refreshToken = jwtServices.signRefresh(normalizedUser);

  await tokenServices.save(normalizedUser.id, refreshToken);

  res.cookies('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 3600 + 1000,
    HttpOnly: true,
  });

  res.send({
    user: normalizedUser,
    accessToken,
  });
};

const controller = {
  register: async (req, res) => {
    const { email, username, password } = req.body;

    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    if (errors.email || errors.password) {
      throw ApiError.badRequest('Bad Request', errors);
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const activationToken = uuidv4();

    const newUser = await userServices.register(
      email,
      username,
      hashedPass,
      activationToken,
    );

    await emailServices.sendActivationEmail(email, activationToken);

    res.send(newUser);
  },
  activate: async (req, res) => {
    const { activationToken } = req.params;

    const user = await userServices.activate(activationToken);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    user.activationToken = null;
    user.save();

    res.send(user);
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await userServices.getByEmail(email);

    if (!user) {
      throw ApiError.badRequest('No Such User');
    }

    const isPassValid = bcrypt.compare(password, user.password);

    if (!isPassValid) {
      throw ApiError.badRequest('Wrong Password');
    }

    generateTokens(res, user);
  },
  refresh: async (req, res) => {
    const { refreshToken } = req.cookies;

    const userData = jwtServices.verifyRefresh(refreshToken);
    const token = await tokenServices.getByToken(refreshToken);

    if (!userData || !token) {
      throw ApiError.unauthorized();
    }

    const user = await userServices.getByEmail(userData.email);

    generateTokens(res, user);
  },
};

module.exports = {
  controller,
};
