const express = require('express');
const {
  controller: roomsController,
} = require('../controllers/rooms.controller');
const { catchError } = require('../utils/catchError');

const router = express.Router();

router.get('/', catchError(roomsController.getAll));

router.get('/:id', catchError(roomsController.getById));

router.post('/', catchError(roomsController.create));

router.delete('/:id', catchError(roomsController.delete));

router.patch('/:id', catchError(roomsController.update));

module.exports = { router };
