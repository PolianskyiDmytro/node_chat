const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Message = sequelize.define(
  'Message',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'messages',
  },
);

const services = {
  getAll: async () => {
    const messages = await Message.findAll();

    return messages;
  },
  getById: async (id) => {
    const message = await Message.findByPk(id);

    return message;
  },
  create: async (messageData) => {
    const message = await Message.create(messageData);

    return message;
  },
  delete: async (id) => {
    const message = await Message.findByPk(id);

    if (!message) {
      throw new Error('Message not found');
    }

    await message.destroy();

    return message;
  },
  update: async (id, message) => {
    await Message.update({ message }, { where: id });
  },
};

module.exports = { services, Message };
