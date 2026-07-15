'use strict';

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { router: messageRouter } = require('./routes/messages.route');
const { router: userRouter } = require('./routes/users.route');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/messages', messageRouter);
app.use('/users', userRouter);

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port ' + (process.env.PORT || 3000));
});
