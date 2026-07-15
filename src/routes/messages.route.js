const express = require('express');
const {
  controller: messageController,
} = require('../controllers/messages.controller');

const router = express.Router();

router.get('/', messageController.getAll);

router.get('/:id', messageController.getById);

router.post('/', messageController.create);

router.delete('/:id', messageController.delete);

router.patch('/:id', messageController.update);

module.exports = { router };
