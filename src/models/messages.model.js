const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const { ApiError } = require('../exceptions/api.error');
const { User } = require('./users.model');

const Message = sequelize.define(
  'Message',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.UUID,
      foreignKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      foreignKey: true,
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

    if (!message) {
      throw ApiError.notFound({
        message: 'No such message',
      });
    }

    return message;
  },
  create: async (messageData) => {
    const message = await Message.create(messageData);

    return message;
  },
  delete: async (id) => {
    const message = await Message.findByPk(id);

    await message.destroy();

    return message;
  },
  update: async (id, message) => {
    await Message.update({ message }, { where: { id } });
  },
  getAllByRoomId: async (roomId) => {
    const roomMessages = await Message.findAll({
      where: { roomId },
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    return roomMessages;
  },
};

module.exports = { services, Message };
