const { services: userServices } = require('../models/users.model');
const { services: emailServices } = require('../services/email.service');
const { v4: uuidv4 } = require('uuid');
const { services: jwtServices } = require('../services/jwt.service');

const controller = {
  register: async (req, res) => {
    const { email, username, password } = req.body;

    const activationToken = uuidv4();

    const newUser = await userServices.register(
      email,
      username,
      password,
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

    if (!user || user.password !== password) {
      res.sendStatus(401);

      return;
    }

    const normalizedUser = userServices.normalize(user);

    const accessToken = jwtServices.sign(normalizedUser);

    res.send({
      user: normalizedUser,
      accessToken,
    });
  },
};

module.exports = {
  controller,
};
