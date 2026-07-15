const express = require('express');

const {
  controller: userController,
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', (req, res) => userController.getAll);

router.get('/:id', (req, res) => userController.getById);

module.exports = { router };
