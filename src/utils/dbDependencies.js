const Room = require('./Room');
const Message = require('./Message');

Room.hasMany(Message, {
  foreignKey: 'roomId',
  onDelete: 'CASCADE',
});

Message.belongsTo(Room, {
  foreignKey: 'roomId',
});
