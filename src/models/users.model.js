const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activationToken: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  },
);

const services = {
  getAll: async () => {
    const users = await User.findAll();

    return users;
  },
  getById: async (id) => {
    const user = await User.findByPk(id);

    return user;
  },
  register: async (email, username, password, activationToken) => {
    const newUser = await User.create({
      email,
      username,
      password,
      activationToken,
    });

    return newUser;
  },
  activate: async (activationToken) => {
    const user = await User.findOne({ where: { activationToken } });

    return user;
  },
  normalize: ({ id, email, username }) => {
    return { id, email, username };
  },
  getByEmail: async (email) => {
    const user = await User.findOne({ where: { email } });

    return user;
  },
};

module.exports = { services, User };
