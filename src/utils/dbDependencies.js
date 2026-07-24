const { Room } = require('../models/rooms.model');
const { Message } = require('../models/messages.model');
const { Token } = require('../models/token.model');
const { User } = require('../models/users.model');

Room.hasMany(Message, {
  foreignKey: 'roomId',
  onDelete: 'CASCADE',
});

Message.belongsTo(Room, {
  foreignKey: 'roomId',
});

Token.belongsTo(User);
User.hasOne(Token);
