const { Message } = require('./services/messages.service');
const { User } = require('./services/users.service');

Message.sync({ force: true });

User.sync({ force: true });
