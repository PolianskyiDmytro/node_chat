const { Message } = require('./models/messages.model');
const { User } = require('./models/users.model');
const { Room } = require('./models/rooms.model');

Message.sync({ force: true });

User.sync({ force: true });

Room.sync({ force: true });
