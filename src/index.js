'use strict';

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { router: messageRouter } = require('./routes/messages.route');
const { router: userRouter } = require('./routes/users.route');
const { router: roomsRouter } = require('./routes/rooms.route');
const { router: authRouter } = require('./routes/auth.route');
const { authMiddleware } = require('./middlewares/auth.middleware');
const { errorMiddleware } = require('./middlewares/error.middleware');
// const path = require('path');
// const fs = require('fs');

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  }),
);
app.use(express.json());
app.use(authRouter);
app.use('/messages', authMiddleware, messageRouter);
app.use('/users', authMiddleware, userRouter);
app.use('/rooms', authMiddleware, roomsRouter);

app.use(errorMiddleware);

// app.get('/', (req, res) => {
//   const indexPath = path.resolve('public', 'index.html');

//   const indexStream = fs.createReadStream(indexPath);

//   res.type('html');
//   indexStream.pipe(res);

//   indexStream.on('error', (err) => {
//     res.status(500).send('Error loading page' + err.message);
//   });
// });

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port ' + (process.env.PORT || 3000));
});
