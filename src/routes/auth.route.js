const express = require('express');
const {
  controller: authController,
} = require('../controllers/auth.consroller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { catchError } = require('../utils/catchError');

const router = express.Router();

router.post('/register', catchError(authController.register));
router.get('/activate/:activationToken', catchError(authController.activate));
router.post('/login', authMiddleware, catchError(authController.login));
router.get('/refresh', catchError(authController.refresh));

module.exports = {
  router,
};
